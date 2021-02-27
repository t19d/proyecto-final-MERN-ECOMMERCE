import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { hacerListaProductos } from '../actions/productoAcciones'

function BufandasScreen(props) {

    const listaProductos = useSelector(state => state.listaProductos);
    const { productos, loading, error } = listaProductos;
    const dispatch = useDispatch();
    const [orden, setOrden] = useState('mayMen');

    const getProductosBufandas = (productos) => {
        // Mostrar solo los de la categoría bufanda
        return (productos.filter(productoItem => {
            return productoItem.categorias.includes('bufanda');
        }));
    }

    const ordenarPor = (order) => {
        switch (order) {
            case "menMey":
                return getProductosBufandas(productos).sort((productoA, productoB) => productoA.precioOferta - productoB.precioOferta);
            case "mayMen":
                return getProductosBufandas(productos).sort((productoA, productoB) => productoA.precioOferta - productoB.precioOferta).reverse();
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
            <div className="container">
                <h1 className="text-center tituloPagina">Bufandas</h1>
                {loading && <div className="d-flex justify-content-center"><img src="/images/recursos_web/loading.gif" alt="Cargando" /></div>}
                {error && <div className="text-danger text-center">{error}</div>}
                {productos &&
                    <div className="ordenarPorListaProductos">
                        <select id="ordenarPorProductos" value={orden} onChange={(e) => setOrden(e.target.value)}>
                            <option value="mayMen">Ordenar por precio: mayor a menor</option>
                            <option value="menMey">Ordenar por precio: menor a mayor</option>
                        </select>
                    </div>
                }
                {productos ?
                    <ul className="row listaProductos">
                        {
                            ordenarPor(orden).map(
                                producto =>
                                /*isBufanda(producto.categorias) && */(
                                    <li className="col-md-4 col-sm-6 col-xs-12" key={producto._id}>
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
        </section>);
}

export default BufandasScreen;