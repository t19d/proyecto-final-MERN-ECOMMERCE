import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutPasos from '../components/CheckoutPasos';

function FinalizarPedidoScreen(props) {
    const gastosEnvio = 6.99;
    const carrito = useSelector(state => state.carrito);
    const { carritoItems, envio, pago } = carrito;
    if (!envio.direccion) {
        props.history.push("/envio");
    }

    if (!pago.metodoPago) {
        props.history.push("/pago");
    }

    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
        }
    }, []);

    const realizarPedidoHandler = () => {
        props.history.push("/perfil/pedidos");
    }

    return (
        <div>
            <CheckoutPasos paso1 paso2 paso3 paso4></CheckoutPasos>
            <section className="jumbotron text-center">
                <div className="container">
                    <h1 className="jumbotron-heading">FINALIZAR PEDIDO</h1>
                </div>
            </section>
            <div>
                <h2>Datos de envío envío</h2>
                <div>{carrito.envio.nombre} {carrito.envio.apellidos}</div>
                <div>{carrito.envio.dni}</div>
                <div>{carrito.envio.email}</div>
                <div>{carrito.envio.telefono}</div>
                <div>{carrito.envio.direccion}, {carrito.envio.codigoPostal}</div>
                <div>{carrito.envio.provincia}, {carrito.envio.pais}</div>
            </div>
            <div>
                <h2>Datos de pago</h2>
                <div>Método de pago: {carrito.pago.metodoPago}</div>
            </div>
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
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {
                                                carritoItems.map(item =>
                                                    <tr key={item._id}>
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
                                                            {item.cantidad}
                                                        </td>

                                                        <td className="text-right">{item.precio}€</td>
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
                                <div className="center">
                                    <button onClick={realizarPedidoHandler} className="btn btn-lg btn-block btn-primary text-uppercase" disabled={carritoItems.length === 0} >Finalizar pedido</button>
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </div>);
}

export default FinalizarPedidoScreen;