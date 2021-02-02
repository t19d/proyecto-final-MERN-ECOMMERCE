import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { anhadirAlCarrito, eliminarDelCarrito } from '../actions/carritoAcciones';

function CarritoScreen(props) {
    const gastosEnvio = 6.99;
    const carrito = useSelector(state => state.carrito);
    const { carritoItems } = carrito;

    const productoId = props.match.params.id;
    const cantidad = props.location.search ? Number(props.location.search.split("=")[1]) : 1;
    const dispatch = useDispatch();
    const eliminarDelCarritoHandler = (porductoEliminarId) => {
        dispatch(eliminarDelCarrito(porductoEliminarId));
    }

    useEffect(() => {
        if (productoId) {
            dispatch(anhadirAlCarrito(productoId, cantidad));
        }
        return () => {
        }
    }, []);

    const checkoutHandler = () => {
        props.history.push("/signin?redirect=shipping");
    }

    return (
        <div>
            <section className="jumbotron text-center">
                <div className="container">
                    <h1 className="jumbotron-heading">RESUMEN DE MI PEDIDO</h1>
                </div>
            </section>
            {
                carritoItems.length === 0 ?
                    <div className="container mb-4">
                        EL CARRITO ESTÁ VACÍO
                    </div>
                    :
                    <div className="container mb-4">
                        <div className="row">
                            <div className="col-12">
                                <div className="table-responsive">
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th scope="col"> </th>
                                                <th scope="col">Producto</th>
                                                <th scope="col">Disponibilidad</th>
                                                <th scope="col" className="text-center">Cantidad</th>
                                                <th scope="col" className="text-right">Precio</th>
                                                <th> </th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {
                                                carritoItems.map(item =>
                                                    <tr>
                                                        <td><img className="img-thumbnail" src={item.miniatura} /> </td>
                                                        <td>
                                                            <Link to={"/productos/" + item.producto}>
                                                                {item.nombre}
                                                            </Link>
                                                        </td>
                                                        {
                                                            item.cantidadStokL === 0 ?
                                                                <td>Sin stock</td>
                                                                :
                                                                <td>Disponible</td>
                                                        }
                                                        {/* Cantidad */}
                                                        <td>
                                                            <select value={item.cantidad} onChange={(event) => dispatch(anhadirAlCarrito(item.producto, event.target.value))}>
                                                                {[...Array(item.cantidadStokL).keys()].map(
                                                                    (x) => (
                                                                        <option key={x + 1} value={x + 1}>
                                                                            {x + 1}
                                                                        </option>
                                                                    )
                                                                )}
                                                            </select>
                                                        </td>

                                                        <td className="text-right">{item.precio}€</td>
                                                        <td className="text-right">
                                                            <button className="btn btn-sm btn-outline-danger" onClick={() => eliminarDelCarritoHandler(item.producto)}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                                                    <path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z" />
                                                                </svg>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )
                                            }

                                            <tr>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td>SUBTOTAL ({carritoItems.reduce((a, c) => a + c.cantidad, 0)} productos)</td>
                                                <td className="text-right">{carritoItems.reduce((a, c) => a + c.precio * c.cantidad, 0)} €</td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td>GASTOS DE ENVIO</td>
                                                <td className="text-right">{gastosEnvio} €</td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td>TOTAL</td>
                                                <td className="text-right">{carritoItems.reduce((a, c) => a + c.precio * c.cantidad, 0) + gastosEnvio} €</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="col mb-2">
                                <div className="row">
                                    <div className="col-sm-12  col-md-6">
                                        <button className="btn btn-lg btn-block btn-secondary text-uppercase">Seguir comprando</button>
                                    </div>
                                    <div className="col-sm-12 col-md-6 text-right">
                                        <button onClick={checkoutHandler} className="btn btn-lg btn-block btn-primary text-uppercase" disabled={carritoItems.length === 0} >Tramitar pedido</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </div>);
}

export default CarritoScreen;