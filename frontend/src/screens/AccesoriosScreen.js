import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { hacerListaProductos } from '../actions/productoAcciones'

function AccesoriosScreen(props) {

    const listaProductos = useSelector(state => state.listaProductos);
    const { productos, loading, error } = listaProductos;
    const dispatch = useDispatch();
    const [orden, setOrden] = useState('mayMen');
    const [filtros, setFiltros] = useState([]);


    const filtrarProductos = () => {
        return (getProductosAccesorios(productos).filter(itemProducto => {
            return filtros.every((itemFiltro) => {
                switch (itemFiltro) {
                    case "babero":
                        return itemProducto.categorias.includes('babero');
                    case "bebida":
                        return itemProducto.categorias.includes('bebida');
                    case "posavasos":
                        return itemProducto.categorias.includes('posavasos');
                    case "taza":
                        return itemProducto.categorias.includes('taza');
                    case "termo":
                        return itemProducto.categorias.includes('termo');
                    case "funda":
                        return itemProducto.categorias.includes('funda');
                    case "iphone_11pro":
                        return itemProducto.categorias.includes('iphone_11pro');
                    case "iphone_se":
                        return itemProducto.categorias.includes('iphone_se');
                    case "gorra":
                        return itemProducto.categorias.includes('gorra');
                    case "mochila":
                        return itemProducto.categorias.includes('mochila');
                    case "bandolera":
                        return itemProducto.categorias.includes('bandolera');
                    case "bolsa deporte":
                        return itemProducto.categorias.includes('bolsa deporte');
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

    const getProductosAccesorios = (productos) => {
        // Mostrar solo los de la categoría accesorio
        return (productos.filter(productoItem => {
            return productoItem.categorias.includes('accesorio');
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
        //setListaProductosFiltrada(productos.filter(item => item. > 3));
        return () => {
            //
        }
    }, []);

    return (
        <section>
            <div className="container">
                <h1 className="text-center tituloPagina">Accesorios</h1>
                {loading && <div className="d-flex justify-content-center"><img src="/images/recursos_web/loading.gif" alt="Cargando" /></div>}
                {error && <div>{error}</div>}
                <div className="row">
                    <div id="contenedorFiltros" className="col-sm-3">
                        <h3>Filtrar por tipo de producto</h3>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="babero" id="filtrarPorProductoBabero" onChange={(e) => anhadirFiltro(e.target.value)} />
                            <label className="form-check-label" htmlFor="filtrarPorProductoBabero">Babero</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="bebida" id="filtrarPorProductoBebida" onChange={(e) => anhadirFiltro(e.target.value)} />
                            <label className="form-check-label" htmlFor="filtrarPorProductoBebida">Bebida</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="posavasos" id="filtrarPorProductoPosavasos" onChange={(e) => anhadirFiltro(e.target.value)} />
                            <label className="form-check-label" htmlFor="filtrarPorProductoPosavasos">Posavasos</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="taza" id="filtrarPorProductoTaza" onChange={(e) => anhadirFiltro(e.target.value)} />
                            <label className="form-check-label" htmlFor="filtrarPorProductoTaza">Taza</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="termo" id="filtrarPorProductoTermo" onChange={(e) => anhadirFiltro(e.target.value)} />
                            <label className="form-check-label" htmlFor="filtrarPorProductoTermo">Termo</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="funda" id="filtrarPorProductoFunda" onChange={(e) => anhadirFiltro(e.target.value)} />
                            <label className="form-check-label" htmlFor="filtrarPorProductoFunda">Funda</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="iphone_11pro" id="filtrarPorProductoIphone11PRO" onChange={(e) => anhadirFiltro(e.target.value)} />
                            <label className="form-check-label" htmlFor="filtrarPorProductoIphone11PRO">IPHONE 11 PRO</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="iphone_se" id="filtrarPorProductoIphoneSE" onChange={(e) => anhadirFiltro(e.target.value)} />
                            <label className="form-check-label" htmlFor="filtrarPorProductoIphoneSE">IPHONE SE</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="gorra" id="filtrarPorProductoGorra" onChange={(e) => anhadirFiltro(e.target.value)} />
                            <label className="form-check-label" htmlFor="filtrarPorProductoGorra">Gorra</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="mochila" id="filtrarPorProductoMochila" onChange={(e) => anhadirFiltro(e.target.value)} />
                            <label className="form-check-label" htmlFor="filtrarPorProductoMochila">Mochila</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="bandolera" id="filtrarPorProductoBandolera" onChange={(e) => anhadirFiltro(e.target.value)} />
                            <label className="form-check-label" htmlFor="filtrarPorProductoBandolera">Bandolera</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="bolsa deporte" id="filtrarPorProductoBolsaDeporte" onChange={(e) => anhadirFiltro(e.target.value)} />
                            <label className="form-check-label" htmlFor="filtrarPorProductoBolsaDeporte">Bolsa deporte</label>
                        </div>



                    </div>
                    <div className="col-sm-9">
                        <div className="ordenarPorListaProductos">
                            <select id="ordenarPorProductos" value={orden} onChange={(e) => setOrden(e.target.value)}>
                                <option value="mayMen">Ordenar por precio: mayor a menor</option>
                                <option value="menMey">Ordenar por precio: menor a mayor</option>
                            </select>
                        </div>
                        {ordenarPor(orden).length > 0 ? <ul className="row listaProductos">
                            {
                                ordenarPor(orden).map(
                                    producto =>
                                        /*isAccesorio(producto.categorias) &&*/(
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
            </div>
        </section>);
}

export default AccesoriosScreen;