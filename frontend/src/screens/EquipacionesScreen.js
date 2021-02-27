import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { hacerListaProductos } from '../actions/productoAcciones'

function EquipacionesScreen(props) {

    const listaProductos = useSelector(state => state.listaProductos);
    const { productos, loading, error } = listaProductos;
    const dispatch = useDispatch();
    const [orden, setOrden] = useState('mayMen');
    const [filtros, setFiltros] = useState([]);

    const filtrarProductos = () => {
        return (getProductosEquipacion(productos).filter(itemProducto => {
            return filtros.every((itemFiltro) => {
                switch (itemFiltro) {
                    case "XS":
                        if (itemProducto.cantidadStockXS > 0) {
                            return itemProducto;
                        }
                        break;
                    case "S":
                        if (itemProducto.cantidadStockS > 0) {
                            return itemProducto;
                        }
                        break;
                    case "M":
                        if (itemProducto.cantidadStockM > 0) {
                            return itemProducto;
                        }
                        break;
                    case "L":
                        if (itemProducto.cantidadStockL > 0) {
                            return itemProducto;
                        }
                        break;
                    case "XL":
                        if (itemProducto.cantidadStockXL > 0) {
                            return itemProducto;
                        }
                        break;
                    case "20_21":
                        return itemProducto.categorias.includes('20_21');
                    case "primera":
                        return itemProducto.categorias.includes('primera');
                    case "segunda":
                        return itemProducto.categorias.includes('segunda');
                    case "calentamiento":
                        return itemProducto.categorias.includes('calentamiento');
                }
            })
        }));
    }

    const anhadirFiltro = (itemFiltro) => {
        // Comprobar si ya está puesto el filtro
        if (filtros.includes(itemFiltro) || filtros.empty) {
            setFiltros(filtros.filter(f => f != itemFiltro));
        } else {
            setFiltros(filtros.concat(itemFiltro));
        }
    }

    const getProductosEquipacion = (productos) => {
        // Mostrar solo los de la categoría equipacion
        return (productos.filter(productoItem => {
            return productoItem.categorias.includes('equipacion');
        }));
    }

    const ordenarPor = (order) => {
        switch (order) {
            case "menMey":
                return filtrarProductos().sort((productoA, productoB) => productoA.precioOferta - productoB.precioOferta);
            case "mayMen":
                return filtrarProductos().sort((productoA, productoB) => productoA.precioOferta - productoB.precioOferta).reverse();
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
            <img src="/images/recursos_web/cabecera_camiseta_blanca_grande.png" width="100%" alt="Cabecera camiseta blanca" />
            <div className="container">
                <h1 className="text-center tituloPagina">Equipaciones</h1>
                {loading && <div className="d-flex justify-content-center"><img src="/images/recursos_web/loading.gif" alt="Cargando" /></div>}
                {error && <div className="text-danger text-center">{error}</div>}
                {productos ?
                    <div className="row">
                        <div id="contenedorFiltros" className="col-sm-3">
                            <h3>Filtrar por temporada</h3>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="20_21" id="filtrarPorProducto2021" onChange={(e) => anhadirFiltro(e.target.value)} />
                                <label className="form-check-label" htmlFor="filtrarPorProducto2021">20/21</label>
                            </div>
                            <h3>Filtrar por tipo de producto</h3>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="primera" id="filtrarPorProductoMangaPrimera" onChange={(e) => anhadirFiltro(e.target.value)} />
                                <label className="form-check-label" htmlFor="filtrarPorProductoPrimera">Primera equipación</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="segunda" id="filtrarPorProductoMangaSegunda" onChange={(e) => anhadirFiltro(e.target.value)} />
                                <label className="form-check-label" htmlFor="filtrarPorProductoSegunda">Segunda equipación</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="calentamiento" id="filtrarPorProductoMangaCalentamiento" onChange={(e) => anhadirFiltro(e.target.value)} />
                                <label className="form-check-label" htmlFor="filtrarPorProductoCalentamiento">Equipación prepartido</label>
                            </div>


                            <h3>Filtrar por talla</h3>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="XS" id="filtrarPorTallaXS" onChange={(e) => anhadirFiltro(e.target.value)} />
                                <label className="form-check-label" htmlFor="filtrarPorTallaXS">XS</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="S" id="filtrarPorTallaS" onChange={(e) => anhadirFiltro(e.target.value)} />
                                <label className="form-check-label" htmlFor="filtrarPorTallaS">S</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="M" id="filtrarPorTallaM" onChange={(e) => anhadirFiltro(e.target.value)} />
                                <label className="form-check-label" htmlFor="filtrarPorTallaM">M</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="L" id="filtrarPorTallaL" onChange={(e) => anhadirFiltro(e.target.value)} />
                                <label className="form-check-label" htmlFor="filtrarPorTallaL">L</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="XL" id="filtrarPorTallaXL" onChange={(e) => anhadirFiltro(e.target.value)} />
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
                            {ordenarPor(orden).length > 0 ?
                                <ul className="row listaProductos">
                                    {
                                        ordenarPor(orden).map(
                                            producto =>
                                        /*isEquipacion(producto.categorias) && */(
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
                                </ul> : <h3 className="text-center text-danger">
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height=".75em" fill="currentColor" className="bi bi-emoji-frown" viewBox="0 0 16 18">
                                            <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                            <path fillRule="evenodd" d="M4.285 12.433a.5.5 0 0 0 .683-.183A3.498 3.498 0 0 1 8 10.5c1.295 0 2.426.703 3.032 1.75a.5.5 0 0 0 .866-.5A4.498 4.498 0 0 0 8 9.5a4.5 4.5 0 0 0-3.898 2.25.5.5 0 0 0 .183.683z" />
                                            <path d="M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z" />
                                        </svg>
                                    </span>
                                    <span>No hay resultados</span>
                                </h3>}
                        </div>
                    </div>
                    :
                    <div className="text-danger text-center">Fallo de conexión a la base de datos</div>}
            </div>
        </section>);
}

export default EquipacionesScreen;