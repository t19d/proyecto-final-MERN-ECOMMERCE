import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { guardarProducto, hacerListaProductos, eliminarProducto } from '../actions/productoAcciones';
import { productoEliminadoReducer } from '../reducers/productoReducers';

function ManageProductosScreen(props) {
    const [modalVisible, setModalVisible] = useState(false);

    const [id, setId] = useState('');
    const [nombre, setNombre] = useState('');
    const [miniatura, setMiniatura] = useState('');
    const [precio, setPrecio] = useState('');
    const [precioOferta, setPrecioOferta] = useState('');
    const [imgDescripcion, setImgDescripcion] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [imagenes, setImagenes] = useState('');
    const [categorias, setCategorias] = useState('');
    const [cantidadStockXS, setCantidadStockXS] = useState('');
    const [cantidadStockS, setCantidadStockS] = useState('');
    const [cantidadStockM, setCantidadStockM] = useState('');
    const [cantidadStockL, setCantidadStockL] = useState('');
    const [cantidadStockXL, setCantidadStockXL] = useState('');

    const listaProductos = useSelector(state => state.listaProductos);
    const { loading, productos, error } = listaProductos;

    const abrirModal = (producto) => {
        setModalVisible(true);
        setId(producto._id);
        setNombre(producto.nombre);
        setMiniatura(producto.miniatura);
        setPrecio(producto.precio);
        setPrecioOferta(producto.precioOferta);
        setImgDescripcion(producto.imgDescripcion);
        setDescripcion(producto.descripcion);
        setImagenes(producto.imagenes);
        setCategorias(producto.categorias);
        setCantidadStockXS(producto.cantidadStockXS);
        setCantidadStockS(producto.cantidadStockS);
        setCantidadStockM(producto.cantidadStockM);
        setCantidadStockL(producto.cantidadStockL);
        setCantidadStockXL(producto.cantidadStockXL);
    }

    const productoGuardado = useSelector(state => state.productoGuardado);
    const { loading: loadingGuardado, success: successGuardado, error: errorGuardado } = productoGuardado;
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(guardarProducto({ _id: id, nombre, miniatura, precio, precioOferta, imgDescripcion, descripcion, imagenes, categorias, cantidadStockXS, cantidadStockS, cantidadStockM, cantidadStockL, cantidadStockXL }));
    };


    const productoEliminado = useSelector(state => state.productoEliminado);
    const { loading: loadingEliminado, success: successEliminado, error: errorEliminado } = productoEliminado;
    const eliminarHandler = (producto) => {
        dispatch(eliminarProducto(producto._id));
    };

    useEffect(() => {
        if (successGuardado) {
            setModalVisible(false);
        }
        dispatch(hacerListaProductos());
        return () => {
            //
        };
    }, [successGuardado, successEliminado]);

    return (
        <div>

            <div>
                <h1>Manage Productos</h1>
                <button onClick={() => abrirModal({})}>Crear producto</button>
            </div>
            {modalVisible &&
                <div className="formularioCrearProducto text-center container-sm" onSubmit={submitHandler}>
                    <h1>{id ? "Editar producto" : "Crear producto"}</h1>
                    {loadingGuardado && <div className="d-flex justify-content-center"><img src="/images/recursos_web/loading.gif" alt="Cargando" /></div>}
                    {errorGuardado && <div>{errorGuardado}</div>}
                    <form className="formCrearProducto">
                        <input className="form-control" type="text" name="nombre" placeholder="Nombre" value={nombre} autoFocus="" onChange={(e) => setNombre(e.target.value)} />
                        <input className="form-control" type="text" name="miniatura" placeholder="Ruta miniatura" value={miniatura} autoFocus="" onChange={(e) => setMiniatura(e.target.value)} />
                        <input className="form-control" type="text" name="imgDescripcion" placeholder="Descripción de la imagen" value={imgDescripcion} autoFocus="" onChange={(e) => setImgDescripcion(e.target.value)} />
                        <input className="form-control" type="number" step="0.01" name="precio" placeholder="Precio" value={precio} onChange={(e) => setPrecio(e.target.value)} />
                        <input className="form-control" type="number" step="0.01" name="precioOferta" placeholder="Precio oferta (poner el mismo si no está de oferta)" value={precioOferta} onChange={(e) => setPrecioOferta(e.target.value)} />
                        <textarea className="form-control" name="descripcion" placeholder="Descripción del producto" value={descripcion} autoFocus="" onChange={(e) => setDescripcion(e.target.value)} />
                        {/* Hacer un split de las imágenes y categorías con ! */}
                        <textarea className="form-control" name="imagenes" placeholder="Rutas de las imágenes (separadas por ',')" value={imagenes} autoFocus="" onChange={(e) => setImagenes(e.target.value.split(","))} />
                        <textarea className="form-control" name="categorias" placeholder="Categorías (separadas por ',')" value={categorias} autoFocus="" onChange={(e) => setCategorias(e.target.value.split(","))} />
                        <input className="form-control" type="number" name="cantidadStockXS" placeholder="Cantidad stok tallas XS" value={cantidadStockXS} autoFocus="" onChange={(e) => setCantidadStockXS(e.target.value)} />
                        <input className="form-control" type="number" name="cantidadStockS" placeholder="Cantidad stok tallas S" value={cantidadStockS} onChange={(e) => setCantidadStockS(e.target.value)} />
                        <input className="form-control" type="number" name="cantidadStockM" placeholder="Cantidad stok tallas M" value={cantidadStockM} onChange={(e) => setCantidadStockM(e.target.value)} />
                        <input className="form-control" type="number" name="cantidadStockL" placeholder="Cantidad stok tallas L" value={cantidadStockL} onChange={(e) => setCantidadStockL(e.target.value)} />
                        <input className="form-control" type="number" name="cantidadStockXL" placeholder="Cantidad stok tallas XL" value={cantidadStockXL} onChange={(e) => setCantidadStockXL(e.target.value)} />

                        <button className="btn btn-lg btn-primary btn-block" type="submit">{id ? "Editar" : "Crear"}</button>
                        <button className="btn btn-lg btn-secondary btn-block" onClick={() => setModalVisible(false)} type="submit">Cerrar</button>
                    </form>
                </div>
            }



            <div className="col-12">
                <div className="table-responsive">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">NOMBRE</th>
                                <th scope="col">MINIATURA</th>
                                <th scope="col">PRECIO (€)</th>
                                <th scope="col">PRECIO OFERTA (€)</th>
                                <th scope="col">TALLAS XS</th>
                                <th scope="col">TALLAS S</th>
                                <th scope="col">TALLAS M</th>
                                <th scope="col">TALLAS L</th>
                                <th scope="col">TALLAS XL</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productos.map((producto) => (
                                <tr key={producto._id}>
                                    <td>{producto._id}</td>
                                    <td>{producto.nombre}</td>
                                    <td><img className="img-thumbnail" src={producto.miniatura} /></td>
                                    <td>{producto.precio}</td>
                                    <td>{producto.precioOferta}</td>
                                    <td>{producto.cantidadStockXS}</td>
                                    <td>{producto.cantidadStockS}</td>
                                    <td>{producto.cantidadStockM}</td>
                                    <td>{producto.cantidadStockL}</td>
                                    <td>{producto.cantidadStockXL}</td>
                                    <td>
                                        <button
                                            type="button"
                                            className="small"
                                            onClick={() =>
                                                //props.history.push(`/producto/${producto._id}/editar`)
                                                abrirModal(producto)
                                            }
                                        >Editar</button>
                                        <button
                                            type="button"
                                            className="small"
                                            onClick={() => {eliminarHandler(producto)
                                        }}
                                        >Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ManageProductosScreen;