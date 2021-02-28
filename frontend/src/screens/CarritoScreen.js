import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { anhadirAlCarrito, eliminarDelCarrito } from '../actions/carritoAcciones';

function CarritoScreen(props) {
    const carrito = useSelector(state => state.carrito);
    const { carritoItems } = carrito;
    const subtotal = Number.parseFloat(carritoItems.reduce((a, c) => a + c.precio * c.cantidad, 0).toFixed(2));
    const gastosEnvio = (subtotal >= 100) ? Number.parseFloat(0) : Number.parseFloat(6.99);
    const total = Number.parseFloat((subtotal + gastosEnvio).toFixed(2));

    /*const productoId = props.match.params.id;
    const variablesProducto = props.location.search ? props.location.search.split("?")[1] : "cantidad=1-talla=XL";
    const cantidad = props.location.search ? Number(variablesProducto.split("-")[0].split("=")[1]) : 1;
    const talla = props.location.search ? variablesProducto.split("-")[1].split("=")[1] : "XL";*/
    const dispatch = useDispatch();
    const eliminarDelCarritoHandler = (porductoEliminarId) => {
        dispatch(eliminarDelCarrito(porductoEliminarId));
    }
    console.log(carritoItems);

    useEffect(() => {
        /*if (productoId) {
            dispatch(anhadirAlCarrito(productoId, cantidad, talla));
        }*/
        return () => {
        }
    }, []);

    const seguirComprando = () => {
        props.history.push("/");
    }

    const checkoutHandler = () => {
        props.history.push("/iniciosesion?redirect=envio");
    }

    return (
        <div>
            <section className="jumbotron text-center">
                <div className="container">
                    <h1 className="jumbotron-heading">CARRITO</h1>
                </div>
            </section>
            {
                carritoItems.length === 0 ?
                    <div className="container mb-4 text-center">
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
                                                <th scope="col">Talla</th>
                                                <th scope="col" className="text-center">Cantidad</th>
                                                <th scope="col" className="text-right">Precio</th>
                                                <th> </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                carritoItems.map(item =>

                                                    <tr key={item._id}>
                                                        <td className="filaImagenMiniaturaLista">
                                                            <img className="img-thumbnail imagenMiniaturaLista" src={item.miniatura} />
                                                        </td>
                                                        <td>
                                                            <Link to={"/productos/" + item.producto}>
                                                                {item.nombre}
                                                            </Link>
                                                        </td>
                                                        {
                                                            item.cantidadStock === 0 ?
                                                                <td>Sin stock</td>
                                                                :
                                                                <td>Disponible</td>
                                                        }
                                                        <td className="text-right">{item.talla}</td>
                                                        {/* Cantidad */}
                                                        <td>
                                                            <select value={item.cantidad} onChange={(event) => dispatch(anhadirAlCarrito(item.producto, event.target.value, item.talla))}>
                                                                {[...Array(item.cantidadStock).keys()].map(
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
                                                                    <path fillRule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z" />
                                                                </svg>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )
                                            }

                                            <tr>
                                                <td colSpan="5">SUBTOTAL ({carritoItems.reduce((a, c) => (Number.parseInt(a) + Number.parseInt(c.cantidad)), 0)} productos)</td>
                                                <td colSpan="2" className="text-right">{subtotal} €</td>
                                            </tr>
                                            <tr>
                                                <td colSpan="5">GASTOS DE ENVIO</td>
                                                <td colSpan="2" className="text-right">{gastosEnvio} €</td>
                                            </tr>
                                            <tr>
                                                <td colSpan="5">TOTAL</td>
                                                <td colSpan="2" className="text-right">{total} €</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="row filaBotones text-center">
                                <div className="col-sm-12 col-xs-12 col-md-6">
                                    <button onClick={seguirComprando} className="btn filaBotonesCancelar">Seguir comprando</button>
                                </div>
                                <div className="col-sm-12 col-xs-12 col-md-6">
                                    <button onClick={checkoutHandler} className="btn filaBotonesAceptar" disabled={carritoItems.length === 0} >Tramitar pedido</button>
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </div>);
}

export default CarritoScreen;