import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { hacerListaProductos } from '../actions/productoAcciones'

function HomeScreen(props) {

    const listaProductos = useSelector(state => state.listaProductos);
    const { productos, loading, error } = listaProductos;
    const dispatch = useDispatch();

    const getProductosPortada = (productos) => {
        // Mostrar solo los de la categoría portada
        return (productos.filter(productoItem => {
            return productoItem.categorias.includes('portada');
        }));
    }

    useEffect(() => {
        dispatch(hacerListaProductos());
        return () => {
            //
        }
    }, []);
    return (
        <section>
            <Link to="/equipaciones">
                <img className="bannerEquipaciones" src="/images/recursos_web/cabecera_camiseta_negra_grande.png" width="100%" alt="Cabecera camiseta negra" />
            </Link>
            <div className="container">
                <h1 className="text-center tituloPagina">Equipaciones oficiales</h1>
                {loading && <div className="d-flex justify-content-center"><img src="/images/recursos_web/loading.gif" alt="Cargando" /></div>}
                {error && <div className="text-danger text-center">{error}</div>}
                {productos ?
                    <ul className="row listaProductos">
                        {getProductosPortada(productos).map(
                            producto =>
                                /*isPortada(producto.categorias) &&*/(
                                <li className="col-md-6 col-sm-6 col-xs-12" key={producto._id}>
                                    <Link to={'/productos/' + producto._id} className="col-sm itemProductos">
                                        <div className="card text-center">
                                            <div className="card-body">
                                                {(producto.precioOferta < producto.precio) && <h4 className="descuentoPrecioOferta">{(((producto.precioOferta * (-100)) / producto.precio) + 100).toFixed(0)}%</h4>}
                                                <img src={producto.miniatura} className="card-img imagenItem" alt={producto.imgDescripcion} />
                                                <h5 className="card-title">{producto.nombre}</h5>
                                                {(producto.precioOferta < producto.precio) ? <h5 className="card-title precioItem">{producto.precioOferta}€ <span className="precioAntiguoOfertaLista">{producto.precio}€</span></h5> :
                                                    <h5 className="card-title precioItem">{producto.precio} €</h5>}
                                            </div>
                                        </div>
                                    </Link>
                                </li>
                            )
                        )
                        }
                    </ul>
                    :
                    <div className="text-danger text-center">Fallo de conexión a la base de datos</div>}
            </div>
        </section>
    );
}

export default HomeScreen;