import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { hacerListaProductos } from '../actions/productoAcciones'

function ModaScreen(props) {

    const listaProductos = useSelector(state => state.listaProductos);
    const { productos, loading, error } = listaProductos;
    const dispatch = useDispatch();
    const [orden, setOrden] = useState('mayMen');

    const isRopa = (categorias) => {
        var respuesta = false;
        categorias.forEach(element => {
            if (element.toLowerCase() === "ropa") {
                respuesta = true;
            }
        });
        return respuesta;
    }

    const ordenarPor = (order) => {
        switch (order) {
            case "menMey":
                return productos.sort((productoA, productoB) => productoA.precio - productoB.precio);
            case "mayMen":
                return productos.sort((productoA, productoB) => productoA.precio - productoB.precio).reverse();
        }
    }

    useEffect(() => {
        dispatch(hacerListaProductos());
        return () => {
            //
        }
    }, []);

    return (
        <section>
            {loading && <div className="d-flex justify-content-center"><img src="/images/recursos_web/loading.gif" alt="Cargando" /></div>}
            {error && <div>{error}</div>}
            <div className="container">
                <div className="ordenarPorListaProductos">
                    <select id="ordenarPorProductos" value={orden} onChange={(e) => setOrden(e.target.value)}>
                        <option value="mayMen">Ordenar por precio: mayor a menor</option>
                        <option value="menMey">Ordenar por precio: menor a mayor</option>
                    </select>
                </div>
                <ul className="row listaProductos">
                    {
                        ordenarPor(orden).map(
                            producto =>
                                isRopa(producto.categorias) && (
                                    <li className="col-md-4 col-sm-6 col-xs-12" key={producto._id}>
                                        <Link to={'/productos/' + producto._id} className="col-sm itemProductos">
                                            <div className="card text-center">
                                                <div className="card-body">
                                                    <img src={producto.miniatura} className="card-img imagenItem" alt={producto.imgDescripcion} />
                                                    <h5 className="card-title">{producto.nombre}</h5>
                                                    <h5 className="card-title precioItem">{producto.precio} €</h5>
                                                </div>
                                            </div>
                                        </Link>
                                    </li>
                                )
                        )
                    }
                </ul>
            </div>
        </section>);
}

export default ModaScreen;