import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { hacerListaProductos } from '../actions/productoAcciones'

function HomeScreen(props) {

    const listaProductos = useSelector(state => state.listaProductos);
    const { productos, loading, error } = listaProductos;
    const dispatch = useDispatch();

    const isPortada = (categorias) => {
        var respuesta = false;
        //console.log(categorias)
        categorias.forEach(element => {
            if (element.toLowerCase() === "portada") {
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
            <a href="/equipaciones"><img src="/images/recursos_web/Cabecera_camiseta_negra_grande.png" width="100%" alt="Cabecera camiseta negra" /></a>
            {loading && <div className="d-flex justify-content-center"><img src="/images/recursos_web/loading.gif" alt="Cargando" /></div>}
            {error && <div>{error}</div>}
            <div className="container">
                <h1 className="text-center text-uppercase font-weight-bold">Equipaciones Oficiales</h1>
                <ul className="row listaProductos">
                    {
                        productos.map(
                            producto =>
                                isPortada(producto.categorias) && (
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
            </div>
        </section>
    );
}

export default HomeScreen;