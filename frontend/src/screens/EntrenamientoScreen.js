import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { hacerListaProductos } from '../actions/productoAcciones'

function EntrenamientoScreen(props) {

    const listaProductos = useSelector(state => state.listaProductos);
    const { productos, loading, error } = listaProductos;
    const dispatch = useDispatch();

    const isEntrenamiento = (categorias) => {
        var respuesta = false;
        categorias.forEach(element => {
            if (element.toLowerCase() === "entrenamiento") {
                respuesta = true;
            }
        });
        return respuesta;
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
                <ul className="row listaProductos">
                    {
                        productos.map(
                            producto =>
                                isEntrenamiento(producto.categorias) && (
                                    <li class="col-md-4 col-sm-6 col-xs-12">
                                        <Link to={'/productos/' + producto._id} className="col-sm itemProductos" key={producto._id}>
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

export default EntrenamientoScreen;