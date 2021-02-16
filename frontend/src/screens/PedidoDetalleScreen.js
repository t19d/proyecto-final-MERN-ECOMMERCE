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
                <section>
                    <div className="container">
                        <h3>ID: {pedido._id}</h3>
                        <h3 className="">Total: {pedido.total} €</h3>
                        <h3 className="">Subtotal: {pedido.subtotal} €</h3>
                        <h3 className="">Gastos de envío: {pedido.gastosEnvio} €</h3>
                        <h3 className="">Pagado con {pedido.metodoPago}</h3>
                        <h3 className="">Fecha de compra: {pedido.pagadoDia.split("T")[0].split("-")[2]}-{pedido.pagadoDia.split("T")[0].split("-")[1]}-{pedido.pagadoDia.split("T")[0].split("-")[0]}</h3>
                        <h3 className="">Fecha de llegada: {pedido.llegadaEnvioDia.split("T")[0].split("-")[2]}-{pedido.llegadaEnvioDia.split("T")[0].split("-")[1]}-{pedido.llegadaEnvioDia.split("T")[0].split("-")[0]}</h3>
                        <h3 className="">Datos de envío:</h3>
                        <ul className="itemPedidosDatosEnvio">
                            <h3 className="">Nombre: {pedido.direccion.nombre}</h3>
                            <h3 className="">Apellidos: {pedido.direccion.apellidos}</h3>
                            <h3 className="">Dni - Nif - Cif - Pasaporte: {pedido.direccion.dni}</h3>
                            <h3 className="">Teléfono: {pedido.direccion.telefono}</h3>
                            <h3 className="">Dirección: {pedido.direccion.direccion}</h3>
                            <h3 className="">Código postal: {pedido.direccion.codigoPostal}</h3>
                            <h3 className="">País: {pedido.direccion.pais}</h3>
                            <h3 className="">Provincia: {pedido.direccion.provincia}</h3>
                            <h3 className="">Email: {pedido.direccion.email}</h3>
                        </ul>
                        <h3 className="">Productos: ({pedido.pedidoItems.length} items)</h3>
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
                                                <td><img className="img-thumbnail" src={producto.miniatura} /> </td>
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