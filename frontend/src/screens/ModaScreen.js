import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { hacerListaProductos } from '../actions/productoAcciones'

function ModaScreen(props) {

    const listaProductos = useSelector(state => state.listaProductos);
    const { productos, loading, error } = listaProductos;
    const dispatch = useDispatch();
    const [orden, setOrden] = useState('mayMen');
    const [filtros, setFiltros] = useState(["XS", "S", "M", "L", "XL", "chaqueta"]);

    const filtrarProductos = () => {
        return (getProductosModa(productos).filter(itemProducto => {

            return filtros.every((itemFiltro) => {
                console.log(itemFiltro)
                switch (itemFiltro) {
                    case "XS":
                        if (itemProducto.cantidadStockXS > 0) {
                            console.log(itemProducto)
                            return itemProducto;
                        }
                        break;
                    case "S":
                        if (itemProducto.cantidadStockXS > 0) {
                            console.log(itemProducto)
                            return itemProducto;
                        }
                        break;
                    case "M":
                        if (itemProducto.cantidadStockXS > 0) {
                            console.log(itemProducto)
                            return itemProducto;
                        }
                        break;
                    case "L":
                        if (itemProducto.cantidadStockXS > 0) {
                            console.log(itemProducto)
                            return itemProducto;
                        }
                        break;
                    case "XL":
                        if (itemProducto.cantidadStockXS > 0) {
                            console.log(itemProducto)
                            return itemProducto;
                        }
                        break;
                    default:
                        return itemProducto;
                }
            })
        }
        )
        );
    }

    const getProductosModa = (productos) => {
        // Mostrar solo los de la categoría moda
        return (productos.filter(productoItem => {
            return productoItem.categorias.includes('ropa');
        }));
    }

    const ordenarPor = (order) => {
        console.log("productos:");
        console.log(productos);
        console.log("productosModa:");
        console.log(getProductosModa(productos));
        console.log("filtro:");
        console.log(filtrarProductos());
        switch (order) {
            case "menMey":
                return getProductosModa(productos).sort((productoA, productoB) => productoA.precioOferta - productoB.precioOferta);
            case "mayMen":
                return getProductosModa(productos).sort((productoA, productoB) => productoA.precioOferta - productoB.precioOferta).reverse();
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
                <h1 className="text-center tituloPagina">Moda</h1>
                {loading && <div className="d-flex justify-content-center"><img src="/images/recursos_web/loading.gif" alt="Cargando" /></div>}
                {error && <div>{error}</div>}
                <div className="row">
                    <div id="contenedorFiltros" className="col-sm-3">
                        <h3>Filtrar por talla</h3>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="filtrarPorTallaXS" id="filtrarPorTallaXS" />
                            <label className="form-check-label" htmlFor="filtrarPorTallaXS">XS</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="filtrarPorTallaS" id="filtrarPorTallaS" />
                            <label className="form-check-label" htmlFor="filtrarPorTallaS">S</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="filtrarPorTallaM" id="filtrarPorTallaM" />
                            <label className="form-check-label" htmlFor="filtrarPorTallaM">M</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="filtrarPorTallaL" id="filtrarPorTallaL" />
                            <label className="form-check-label" htmlFor="filtrarPorTallaL">L</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="filtrarPorTallaXL" id="filtrarPorTallaXL" />
                            <label className="form-check-label" htmlFor="filtrarPorTallaXL">XL</label>
                        </div>
                    </div>
                    <div className="col-sm-9">
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
                                        /*isRopa(producto.categorias) &&*/(
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
                    </div>
                </div>
            </div>
        </section>);
}

export default ModaScreen;