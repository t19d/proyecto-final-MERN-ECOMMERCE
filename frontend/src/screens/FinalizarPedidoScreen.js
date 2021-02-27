import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutPasos from '../components/CheckoutPasos';
import { crearPedido } from '../actions/pedidoAcciones';
import { PEDIDO_CREADO_RESET } from '../constants/pedidoConstantes';

function FinalizarPedidoScreen(props) {
    const usuarioInicioSesion = useSelector(state => state.usuarioInicioSesion);
    const { usuarioInfo } = usuarioInicioSesion;

    const carrito = useSelector(state => state.carrito);
    const { carritoItems, envio, pago } = carrito;
    if (!envio.direccion) {
        props.history.push("/envio");
    }

    if (!pago.metodoPago) {
        props.history.push("/pago");
    }

    const pedidoCreado = useSelector((state) => state.pedidoCreado);
    const { loading, success, error, pedido } = pedidoCreado;

    const subtotal = Number.parseFloat(carritoItems.reduce((a, c) => a + c.precio * c.cantidad, 0).toFixed(2));
    const gastosEnvio = (subtotal >= 100) ? Number.parseFloat(0) : Number.parseFloat(6.99);
    const total = Number.parseFloat((subtotal + gastosEnvio).toFixed(2));

    const realizarPedidoHandler = () => {
        dispatch(crearPedido({
            pedidoItems: carrito.carritoItems,
            direccion: carrito.envio,
            metodoPago: carrito.pago.metodoPago,
            subtotal: Number.parseFloat(subtotal),
            gastosEnvio: Number.parseFloat(gastosEnvio),
            total: Number.parseFloat(total),
            usuario: usuarioInfo._id,
            pagadoDia: new Date(),
            llegadaEnvioDia: new Date().setDate(new Date().getDate() + 7),
        }));
    }

    const cancelarCompra = () => {
        props.history.push("/carrito");
        /* Eliminar datos de envío */
        localStorage.removeItem('envio');
        /* Eliminar datos de pago si hubiera */
    }

    const dispatch = useDispatch();

    useEffect(() => {
        if (success) {
            dispatch({ type: PEDIDO_CREADO_RESET });
        }
        return () => {
        }
    }, [dispatch, pedido, props.history, error]);

    return (
        <div className="container">
            <CheckoutPasos paso1 paso2 paso3 paso4></CheckoutPasos>
            <section className="jumbotron text-center">
                <div className="container">
                    <h1 className="jumbotron-heading">FINALIZAR PEDIDO</h1>
                </div>
            </section>
            <div className="row">
                <div className="col-md-6 col-sm-12 col-xs-12 datosPedido">
                    <h2>Datos de envío:</h2>
                    <div><span>Nombre: </span><span>{carrito.envio.nombre} {carrito.envio.apellidos}</span></div>
                    <div><span>DNI: </span><span>{carrito.envio.dni}</span></div>
                    <div><span>Email: </span><span>{carrito.envio.email}</span></div>
                    <div><span>Teléfono: </span><span>{carrito.envio.telefono}</span></div>
                    <div><span>Dirección 1: </span><span>{carrito.envio.direccion}, {carrito.envio.codigoPostal}</span></div>
                    <div><span>Dirección 2: </span><span>{carrito.envio.provincia}, {carrito.envio.pais}</span></div>
                </div>
                <div className="col-md-6 col-sm-12 col-xs-12 datosPedido">
                    <h2>Datos de pago:</h2>
                    <div><span>Método de pago: </span><span>{carrito.pago.metodoPago}</span></div>
                </div>
            </div>
            <h2 className="text-center mt-4">Productos: ({carrito.carritoItems.length} items)</h2>
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
                                                <th scope="col">Talla</th>
                                                <th scope="col" className="text-center">Cantidad</th>
                                                <th scope="col" className="text-right">Precio</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {
                                                carritoItems.map(item =>

                                                    <tr key={item._id}>
                                                        <td className="filaImagenMiniaturaLista">
                                                            <img className="img-thumbnail imagenMiniaturaLista" src={item.miniatura} />
                                                        </td>
                                                        <td>{item.nombre}</td>
                                                        {
                                                            item.cantidadStock === 0 ?
                                                                <td>Sin stock</td>
                                                                :
                                                                <td>Disponible</td>
                                                        }
                                                        <td className="text-right">{item.talla}</td>
                                                        {/* Cantidad */}
                                                        <td>{item.cantidad}</td>
                                                        <td className="text-right">{item.precio}€</td>
                                                    </tr>
                                                )
                                            }

                                            <tr>
                                                <td colspan="4">SUBTOTAL ({carritoItems.reduce((a, c) => (Number.parseInt(a) + Number.parseInt(c.cantidad)), 0)} productos)</td>
                                                <td colspan="2" className="text-right">{subtotal} €</td>
                                            </tr>
                                            <tr>
                                                <td colspan="4">GASTOS DE ENVIO</td>
                                                <td colspan="2" className="text-right">{gastosEnvio} €</td>
                                            </tr>
                                            <tr>
                                                <td colspan="4">TOTAL</td>
                                                <td colspan="2" className="text-right">{total} €</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12 col-xs-12 col-md-6">
                                    <button onClick={cancelarCompra} className="btn btn-lg btn-block btn-danger text-uppercase">Cancelar compra</button>
                                </div>
                                <div className="col-sm-12 col-xs-12 col-md-6">
                                    <button onClick={realizarPedidoHandler} className="btn btn-lg btn-block btn-primary text-uppercase" disabled={carritoItems.length === 0} >Finalizar pedido</button>
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </div>);
}

export default FinalizarPedidoScreen;