import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { hacerPedidoDetalles } from '../actions/pedidoAcciones';

function PedidoDetalleScreen(props) {
    const pedidoDetalles = useSelector(state => state.pedidoDetalles);
    const { loading, pedido, error } = pedidoDetalles;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(hacerPedidoDetalles(props.match.params.id));
        return () => {
            //
        };
    }, []);

    return (
        loading ? <div className="d-flex justify-content-center"><img src="/images/recursos_web/loading.gif" alt="Cargando" /></div> :
            error ? <div>{error}</div> :
                pedido &&
                <section>
                    <div className="container">
                        <h1 className="tituloPagina text-center">Detalles del pedido {pedido._id}</h1>
                        <div className="row">
                            <div className="col-md-6 col-sm-12 col-xs-12 datosPedido">
                                <h2>Datos de envío:</h2>
                                <div className=""><span>Nombre: </span><span>{pedido.direccion.nombre} {pedido.direccion.apellidos}</span></div>
                                <div className=""><span>Dni - Nif - Cif - Pasaporte: </span><span>{pedido.direccion.dni}</span></div>
                                <div className=""><span>Teléfono: </span><span>{pedido.direccion.telefono}</span></div>
                                <div className=""><span>Dirección: </span><span>{pedido.direccion.direccion}</span></div>
                                <div className=""><span>Código postal: </span><span>{pedido.direccion.codigoPostal}</span></div>
                                <div className=""><span>País: </span><span>{pedido.direccion.pais}</span></div>
                                <div className=""><span>Provincia: </span><span>{pedido.direccion.provincia}</span></div>
                                <div className=""><span>Email: </span><span>{pedido.direccion.email}</span></div>
                            </div>
                            <div className="col-md-6 col-sm-12 col-xs-12 datosPedido">
                                <h2>Datos de pedido:</h2>
                                    <div className=""><span>ID: </span><span>{pedido._id}</span></div>
                                    <div className=""><span>Total: </span><span>{pedido.total} €</span></div>
                                    <div className=""><span>Subtotal: </span><span>{pedido.subtotal} €</span></div>
                                    <div className=""><span>Gastos de envío: </span><span>{pedido.gastosEnvio} €</span></div>
                                    <div className=""><span>Pagado con </span><span>{pedido.metodoPago}</span></div>
                                    <div className=""><span>Fecha de compra: </span><span>{pedido.pagadoDia.split("T")[0].split("-")[2]}-{pedido.pagadoDia.split("T")[0].split("-")[1]}-{pedido.pagadoDia.split("T")[0].split("-")[0]}</span></div>
                                    <div className=""><span>Fecha de llegada: </span><span>{pedido.llegadaEnvioDia.split("T")[0].split("-")[2]}-{pedido.llegadaEnvioDia.split("T")[0].split("-")[1]}-{pedido.llegadaEnvioDia.split("T")[0].split("-")[0]}</span></div>
                            </div>
                            </div>
                            <h2 className="text-center mt-4">Productos: ({pedido.pedidoItems.length} items)</h2>
                            <div className="table-responsive">
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col"> </th>
                                            <th scope="col">Producto</th>
                                            <th scope="col">Talla</th>
                                            <th scope="col" className="text-center">Cantidad</th>
                                            <th scope="col" className="text-center">Precio</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {pedido.pedidoItems.map(
                                            producto => (
                                                <tr key={producto._id}>
                                                    <td className="filaImagenMiniaturaLista">
                                                        <img className="img-thumbnail imagenMiniaturaLista" src={producto.miniatura} />
                                                    </td>
                                                    <td>
                                                        <Link to={"/productos/" + producto.producto}>
                                                            {producto.nombre}
                                                        </Link>
                                                    </td>
                                                    <td className="text-center">{producto.talla}</td>
                                                    <td className="text-center">{producto.cantidad}</td>
                                                    <td className="text-right">{producto.precio}€</td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                </section>
    );
}

export default PedidoDetalleScreen;