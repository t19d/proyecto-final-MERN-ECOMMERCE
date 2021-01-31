import React from 'react';
import { Link } from 'react-router-dom';
import data from '../data';

function ProductoScreen(props) {
    const producto = data.productos.find(p => p._id === props.match.params.id);

    return (
        <section>
            <div className="container">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to="/">
                                <svg width="2em" height="1em" viewBox="0 0 16 16" className="bi bi-house-door-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
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
                    <div className="col-md">
                        <img className="img-fluid" src={producto.miniatura} alt={producto.imgDescripcion} />
                    </div>
                    <div className="col-md">
                        <h2>{producto.nombre}</h2>
                        <h2 className="font-weight-bold">{producto.precio}</h2>
                        <div className="form-group row filaTallas">
                            <div className="col-sm">
                                <label className="form-check-label">
                                    <input className="form-check-input radio-inline" type="radio" name="radioTallas" id="radioTallasXS" value="XS" />
                                XS</label>
                            </div>
                            <div className="col-sm">
                                <label className="form-check-label">
                                    <input className="form-check-input radio-inline" type="radio" name="radioTallas" id="radioTallasS" value="S" />
                                S</label>
                            </div>
                            <div className="col-sm">
                                <label className="form-check-label">
                                    <input className="form-check-input radio-inline" type="radio" name="radioTallas" id="radioTallasM" value="M" />
                                M</label>
                            </div>
                            <div className="col-sm">
                                <label className="form-check-label">
                                    <input className="form-check-input radio-inline" type="radio" name="radioTallas" id="radioTallasL" value="L" />
                                L</label>
                            </div>
                            <div className="col-sm">
                                <label className="form-check-label">
                                    <input className="form-check-input radio-inline" type="radio" name="radioTallas" id="radioTallasXL" value="XL" />
                                XL</label>
                            </div>
                            <div className="col-sm">
                                <label className="form-check-label">
                                    <input className="form-check-input radio-inline" type="radio" name="radioTallas" id="radioTallasXXL" value="XXL" />
                                XXL</label>
                            </div>
                        </div>
                        <div className="cantidadProducto">
                            <span className="">Cantidad:</span>
                            <div>
                                <button>
                                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-dash-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                                        <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
                                    </svg>
                                </button>
                                <input min="0" value="1" max="99" type="number" />
                                <button>
                                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-plus-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                                        <path fillRule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <button type="button" className="btn btn-primary btn-lg btn-block botonAnhadirCarrito">
                            <span>
                                <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-cart-plus" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                                    <path fillRule="evenodd" d="M8.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H9v1.5a.5.5 0 0 1-1 0V8H6.5a.5.5 0 0 1 0-1H8V5.5a.5.5 0 0 1 .5-.5z" />
                                </svg>
                                Añadir al carrito
                            </span>
                        </button>
                    </div >
                </div >
                <div className="descripcionProducto">
                    <span className="tituloDescripcionProducto">Detalles</span>
                    <div className="cuerpoDescripcionProducto">{producto.descripcion}</div>
                </div>
            </div >
        </section >);
}

export default ProductoScreen;