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
        console.log(categorias)
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
            <div className="container">
                <h1 className="text-center text-uppercase font-weight-bold">Equipaciones Oficiales</h1>
                <div className="row listaProductos">
                    {
                        productos.map(
                            producto =>
                                isPortada(producto.categorias) && (<Link to={'/productos/' + producto._id} className="col-sm itemProductos" key={producto._id}>
                                    <div className="card text-center">
                                        <div className="card-body">
                                            <img src={producto.miniatura} className="card-img imagenItem" alt={producto.imgDescripcion} />
                                            <h5 className="card-title">{producto.nombre}</h5>
                                            <h5 className="card-title precioItem">{producto.precio} €</h5>
                                        </div>
                                    </div>
                                </Link>)
                        )
                    }
                    {/*<Link to={'/productos/' + equipacionLocal._id} className="col-sm itemProductos">
                        <div className="card text-center">
                            <div className="card-body">
                                <img src={equipacionLocal.miniatura} className="card-img imagenItem" alt={equipacionLocal.imgDescripcion} />
                                <h5 className="card-title">{equipacionLocal.nombre}</h5>
                                <h5 className="card-title precioItem">{equipacionLocal.precio} €</h5>
                            </div>
                        </div>
                    </Link>
                    <Link to={'/productos/' + equipacionVisitante._id} className="col-sm itemProductos">
                        <div className="card text-center">
                            <div className="card-body">
                                <img src={equipacionVisitante.miniatura} className="card-img imagenItem" alt={equipacionVisitante.imgDescripcion} />
                                <h5 className="card-title">{equipacionVisitante.nombre}</h5>
                                <h5 className="card-title precioItem">{equipacionVisitante.precio} €</h5>
                            </div>
                        </div>
                    </Link>*/}
                </div>
            </div>
        </section>
    );
}

export default HomeScreen;