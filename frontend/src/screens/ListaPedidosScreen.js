import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { hacerListaPedidosUsuario } from '../actions/pedidoAcciones';

function ListaPedidosScreen(props) {
    const usuarioInicioSesion = useSelector(state => state.usuarioInicioSesion);
    const { usuarioInfo } = usuarioInicioSesion;

    const listaPedidosUsuario = useSelector(state => state.listaPedidosUsuario);
    const { loading, pedidos, error } = listaPedidosUsuario;
    const [orden, setOrden] = useState('barCar');

    const ordenarPor = (order) => {
        switch (order) {
            case "carBar":
                return pedidos.sort((pedidoA, pedidoB) => pedidoA.total - pedidoB.total).reverse();
            case "barCar":
                return pedidos.sort((pedidoA, pedidoB) => pedidoA.total - pedidoB.total);
            default:
                return pedidos;
        }
    }

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(hacerListaPedidosUsuario());
        console.log(listaPedidosUsuario)
        return () => {
            //
        };
    }, []);

    return (
        <section>
            <div className="container">
                <h1 className="text-center tituloPagina">Mis pedidos</h1>
                {loading && <div className="d-flex justify-content-center"><img src="/images/recursos_web/loading.gif" alt="Cargando" /></div>}
                {error && <div>{error}</div>}
                {pedidos && <div className="ordenarPorListaPedidos">
                    <select id="ordenarPorPedidos" value={orden} onChange={(e) => setOrden(e.target.value)}>
                        <option value="carBar">Ordenar por total: de más caro a más barato</option>
                        <option value="barCar">Ordenar por total: de más barato a más caro</option>
                    </select>
                </div>}
                <ul className="row listaPedidos">
                    {pedidos && ordenarPor(orden).map(
                        pedido => (
                            <li className="col-md-12 col-sm-12 col-xs-12" key={pedido._id}>
                                <Link to={'/mispedidos/' + pedido._id} className="col-sm itemPedidos">
                                    <div className="card">
                                        <div className="card-body row">
                                            <div className="col-lg-5 col-md-12 col-sm-12 col-xs-12">
                                                <h5 className="card-title">ID: {pedido._id}</h5>
                                                <h5 className="card-title">Total: {pedido.total} €</h5>
                                                <h5 className="card-title">Pagado con {pedido.metodoPago}</h5>
                                                <h5 className="card-title">Fecha: {pedido.pagadoDia.split("T")[0].split("-")[2]}-{pedido.pagadoDia.split("T")[0].split("-")[1]}-{pedido.pagadoDia.split("T")[0].split("-")[0]}</h5>
                                            </div>
                                            <div className="col-lg-7 col-md-12 col-sm-12 col-xs-12">
                                                <h5 className="card-title">Productos: ({pedido.pedidoItems.length} items)</h5>
                                                <ul className="itemPedidosListaProductos">
                                                    {pedido.pedidoItems.map(
                                                        producto => (
                                                            <h6 className="card-title">{producto.nombre} <span className="float-right">({producto.cantidad} x {producto.precio}€)</span></h6>
                                                        ))
                                                    }
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        )
                    )}
                </ul>
            </div>
        </section>
    );
}

export default ListaPedidosScreen;