import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { anhadirAlCarrito } from '../actions/carritoAcciones';
import { hacerProductoDetalles } from '../actions/productoAcciones';

function ProductoScreen(props) {
    const [cantidad, setCantidad] = useState(1);
    const productoDetalles = useSelector(state => state.productoDetalles);
    const { producto, loading, error } = productoDetalles;
    const [talla, setTalla] = useState("XS");
    const [imagenGrande, setImagenGrande] = useState(producto ? producto.miniatura : "");

    /* ZOOOM */
    const [backgroundPosition, setBackgroundPosition] = useState('0% 0%');
    const [zoomImagenStyle, setZoomImagenStyle] = useState({ backgroundImage: "none", backgroundPosition });

    const handleMovimientoZoomRaton = (e) => {
        const { left, top, width, height } = e.target.getBoundingClientRect();
        const x = (e.pageX - left) / width * 100;
        const y = (e.pageY - top) / height * 100;
        setBackgroundPosition(`${x}% ${y}%`);
        setZoomImagenStyle({ backgroundImage: `url(${imagenGrande})`, backgroundPosition });
    }

    const handleMovimientoLeaveRaton = (e) => {
        const { left, top, width, height } = e.target.getBoundingClientRect();
        const x = (e.pageX - left) / width * 100;
        const y = (e.pageY - top) / height * 100;
        setBackgroundPosition(`${x}% ${y}%`);
        setZoomImagenStyle({ backgroundImage: "none", backgroundPosition });
    }


    const dispatch = useDispatch();
    useEffect(() => {
        if (!producto || !(producto._id === props.match.params.id)) {
            dispatch(hacerProductoDetalles(props.match.params.id));
        } else {
            setImagenGrande(producto.miniatura);
        }
        return () => {
            //
        };
    }, [producto]);

    const getStock = (producto) => {
        var cantidadStock = 0;
        switch (talla) {
            case "XS":
                cantidadStock = producto.cantidadStockXS;
                break;
            case "S":
                cantidadStock = producto.cantidadStockS;
                break;
            case "M":
                cantidadStock = producto.cantidadStockM;
                break;
            case "L":
                cantidadStock = producto.cantidadStockL;
                break;
            case "XL":
                cantidadStock = producto.cantidadStockXL;
                break;

            default:
                break;
        }
        return cantidadStock;
    };

    const handleAnhadirCarrito = () => {
        dispatch(anhadirAlCarrito(producto._id, cantidad, talla));
        //props.history.push("/carrito/" + props.match.params.id + "?cantidad=" + cantidad + "-talla=" + talla);
        props.history.push("/carrito");
    }

    return (
        loading ? <div className="d-flex justify-content-center"><img src="/images/recursos_web/loading.gif" alt="Cargando" /></div> :
            error ? <div>{error}</div> :
                <section>
                    <div className="container">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link to="/">
                                        <svg width="2em" height="1.2em" viewBox="0 0 16 20" className="bi bi-house-door-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6.5 10.995V14.5a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .146-.354l6-6a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 .146.354v7a.5.5 0 0 1-.5.5h-4a.5.5 0 0 1-.5-.5V11c0-.25-.25-.5-.5-.5H7c-.25 0-.5.25-.5.495z" />
                                            <path fillRule="evenodd" d="M13 2.5V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z" />
                                        </svg>
                                    </Link>
                                </li>
                                <li className="breadcrumb-item">
                                    <Link to="/equipaciones">
                                        <span href="/equipaciones">Equipaciones</span>
                                    </Link>
                                </li>
                                <li className="breadcrumb-item active" aria-current="page">{producto.nombre}</li>
                            </ol>
                        </nav>
                        <hr className="separacionBreadcrumb" />
                        <div className="row">
                            <div className="col-md-6 col-sm-12 col-xs-12">
                                {/* Imagen principal */}
                                <div className="contenedorImagenGrande" onMouseLeave={(e) => handleMovimientoLeaveRaton(e)} onMouseMove={(e) => handleMovimientoZoomRaton(e)} style={zoomImagenStyle}>
                                    <img className="img-fluid imagenGrande" src={imagenGrande} alt={producto.imgDescripcion} />
                                </div>



                                {/* Imágenes */}
                                {
                                    producto.imagenes &&
                                    <div className="conjuntoImagenesProducto row form-group">
                                        {producto.imagenes.map((imagenProducto) =>
                                            <div className="col-md-4 col-sm-6 col-xs-12">
                                                <input className="" type="radio" name={imagenProducto} id={imagenProducto} value={imagenProducto}
                                                    checked={imagenGrande === imagenProducto} onChange={(e) => setImagenGrande(e.target.value)} />
                                                <label htmlFor={imagenProducto} className="">
                                                    <div className="itemImagenesProducto">
                                                        <img className="img-fluid" src={imagenProducto} alt={producto.imgDescripcion} />
                                                    </div>
                                                </label>
                                            </div>
                                        )
                                        }
                                    </div>
                                }

                                {/* Imágenes carrusel */}
                                {/*
                                    producto.imagenes &&
                                    <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                                        <ol class="carousel-indicators">
                                            <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                                            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                                            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                                        </ol>
                                        <div class="carousel-inner conjuntoImagenesProducto row form-group">

                                            <div class="carousel-item active">
                                                <img class="d-block w-100" src="..." alt="First slide" />
                                            </div>
                                            <div class="carousel-item">
                                                <img class="d-block w-100" src="..." alt="Second slide" />
                                            </div>
                                            <div class="carousel-item">
                                                <img class="d-block w-100" src="..." alt="Third slide" />
                                            </div>
                                            {producto.imagenes.map((imagenProducto) =>
                                                <div className="carousel-item active">
                                                    <div className="col-md-4 col-sm-6 col-xs-12 active">
                                                        <input className="" type="radio" name={imagenProducto} id={imagenProducto} value={imagenProducto}
                                                            checked={imagenGrande === imagenProducto} onChange={(e) => setImagenGrande(e.target.value)} />
                                                        <label htmlFor={imagenProducto} className="">
                                                            <div className="itemImagenesProducto">
                                                                <img className="img-fluid" src={imagenProducto} alt={producto.imgDescripcion} />
                                                            </div>
                                                        </label>
                                                    </div>
                                                    <div className="col-md-4 col-sm-6 col-xs-12">
                                                        <input className="" type="radio" name={imagenProducto} id={imagenProducto} value={imagenProducto}
                                                            checked={imagenGrande === imagenProducto} onChange={(e) => setImagenGrande(e.target.value)} />
                                                        <label htmlFor={imagenProducto} className="">
                                                            <div className="itemImagenesProducto">
                                                                <img className="img-fluid" src={imagenProducto} alt={producto.imgDescripcion} />
                                                            </div>
                                                        </label>
                                                    </div>
                                                    <div className="col-md-4 col-sm-6 col-xs-12">
                                                        <input className="" type="radio" name={imagenProducto} id={imagenProducto} value={imagenProducto}
                                                            checked={imagenGrande === imagenProducto} onChange={(e) => setImagenGrande(e.target.value)} />
                                                        <label htmlFor={imagenProducto} className="">
                                                            <div className="itemImagenesProducto">
                                                                <img className="img-fluid" src={imagenProducto} alt={producto.imgDescripcion} />
                                                            </div>
                                                        </label>
                                                    </div></div>
                                            )
                                            }

                                        </div>
                                        <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                            <span class="sr-only">Previous</span>
                                        </a>
                                        <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                            <span class="sr-only">Next</span>
                                        </a>
                                    </div>
                                */}









                            </div>
                            <div className="col-md-6 col-sm-12 col-xs-12">
                                <h2>{producto.nombre}</h2>
                                {(producto.precioOferta < producto.precio) ? <h2 className="font-weight-bold">{producto.precioOferta}€ <span className="precioAntiguoOferta">{producto.precio}€</span></h2> : <h2 className="font-weight-bold">{producto.precio}€</h2>}
                                <div className="form-group row filaTallas col-md-12 col-sm-12 col-xs-12">
                                    <input className="form-check-input radio-inline" type="radio" name="radioTallasXS" id="radioTallasXS" value="XS"
                                        checked={talla === 'XS'} onChange={(e) => setTalla(e.target.value)} />
                                    <label htmlFor="radioTallasXS" className="form-check-label">XS</label>

                                    <input className="form-check-input radio-inline" type="radio" name="radioTallasS" id="radioTallasS" value="S"
                                        checked={talla === 'S'} onChange={(e) => setTalla(e.target.value)} />
                                    <label htmlFor="radioTallasS" className="form-check-label">S</label>

                                    <input className="form-check-input radio-inline" type="radio" name="radioTallasM" id="radioTallasM" value="M"
                                        checked={talla === 'M'} onChange={(e) => setTalla(e.target.value)} />
                                    <label htmlFor="radioTallasM" className="form-check-label">M</label>


                                    <input className="form-check-input radio-inline" type="radio" name="radioTallasL" id="radioTallasL" value="L"
                                        checked={talla === 'L'} onChange={(e) => setTalla(e.target.value)} />
                                    <label htmlFor="radioTallasL" className="form-check-label">L</label>


                                    <input className="form-check-input radio-inline" type="radio" name="radioTallasXL" id="radioTallasXL" value="XL"
                                        checked={talla === 'XL'} onChange={(e) => setTalla(e.target.value)} />
                                    <label htmlFor="radioTallasXL" className="form-check-label">XL</label>
                                </div>

                                {getStock(producto) > 0 && <div className="cantidadProducto row">
                                    <div className="col-md-3 col-sm-12 col-xs-12 text-center">Cantidad:</div>
                                    <div className="col-md-9 col-sm-12 col-xs-12">
                                        <select className="selectCantidadProducto" value={cantidad} onChange={(event) => setCantidad(event.target.value)}>
                                            {
                                                [...Array(getStock(producto)).keys()].map(
                                                    (x) => (
                                                        <option key={x + 1} value={x + 1}>
                                                            {x + 1}
                                                        </option>
                                                    )
                                                )
                                            }
                                        </select>
                                    </div>
                                </div>
                                }
                                {getStock(producto) > 0 ?
                                    <div className="contenedorBtnCarrito">
                                        <button onClick={handleAnhadirCarrito} type="button" className="btn btn-primary botonAnhadirCarrito text-center">
                                            <span>
                                                <svg width="1em" height="1em" viewBox="0 0 16 20" className="bi bi-cart-plus" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                                                    <path fillRule="evenodd" d="M8.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H9v1.5a.5.5 0 0 1-1 0V8H6.5a.5.5 0 0 1 0-1H8V5.5a.5.5 0 0 1 .5-.5z" />
                                                </svg>
                                            </span>
                                            <span>Añadir al carrito</span>
                                        </button>
                                    </div>
                                    :
                                    <div className="sinStockAvisoDetalles text-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height=".75em" fill="currentColor" className="bi bi-emoji-frown" viewBox="0 0 16 18">
                                            <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                            <path fillRule="evenodd" d="M4.285 12.433a.5.5 0 0 0 .683-.183A3.498 3.498 0 0 1 8 10.5c1.295 0 2.426.703 3.032 1.75a.5.5 0 0 0 .866-.5A4.498 4.498 0 0 0 8 9.5a4.5 4.5 0 0 0-3.898 2.25.5.5 0 0 0 .183.683z" />
                                            <path d="M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z" />
                                        </svg>
                                        Sin stock
                                        </div>
                                }
                            </div >
                        </div >
                        <div className="descripcionProducto">
                            <span className="tituloDescripcionProducto">Detalles</span>
                            <div className="cuerpoDescripcionProducto">{producto.descripcion}</div>
                        </div>
                    </div >
                </section >
    );
}

export default ProductoScreen;
