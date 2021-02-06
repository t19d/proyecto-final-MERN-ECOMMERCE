import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { guardarProducto } from '../actions/productoAcciones';

function ManageProductosScreen(props) {
    const [nombre, setNombre] = useState('');
    const [miniatura, setMiniatura] = useState('');
    const [precio, setPrecio] = useState('');
    const [imgDescripcion, setImgDescripcion] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [imagenes, setImagenes] = useState('');
    const [categorias, setCategorias] = useState('');
    const [cantidadStokXS, setCantidadStokXS] = useState('');
    const [cantidadStokS, setCantidadStokS] = useState('');
    const [cantidadStokM, setCantidadStokM] = useState('');
    const [cantidadStokL, setCantidadStokL] = useState('');
    const [cantidadStokXL, setCantidadStokXL] = useState('');

    const productoGuardado = useSelector(state => state.productoGuardado);
    const { loading: loadingGuardado, success: successGuardado, error: errorGuardado } = productoGuardado;
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(guardarProducto({ nombre, miniatura, precio, imgDescripcion, descripcion, imagenes, categorias, cantidadStokXS, cantidadStokS, cantidadStokM, cantidadStokL, cantidadStokXL }));
    };

    useEffect(() => {

        return () => {
            //
        };
    }, []);

    return (
        <div className="text-center container-sm" onSubmit={submitHandler}>
            <h1>Crear producto</h1>
            {loadingGuardado && <div>Cargando...</div>}
            {errorGuardado && <div>{errorGuardado}</div>}
            <form className="formCrearProducto">
                <input className="form-control" type="text" name="nombre" placeholder="Nombre" autoFocus="" onChange={(e) => setNombre(e.target.value)} />
                <input className="form-control" type="text" name="miniatura" placeholder="Ruta miniatura" autoFocus="" onChange={(e) => setMiniatura(e.target.value)} />
                <input className="form-control" type="text" name="imgDescripcion" placeholder="Descripción de la imagen" autoFocus="" onChange={(e) => setImgDescripcion(e.target.value)} />
                <input className="form-control" type="number" step="0.01" name="precio" placeholder="Precio" onChange={(e) => setPrecio(e.target.value)} />
                <textarea className="form-control" name="descripcion" placeholder="Descripción del producto" autoFocus="" onChange={(e) => setDescripcion(e.target.value)} />
                {/* Hacer un split de las imágenes y categorías con ! */}
                <textarea className="form-control" name="imagenes" placeholder="Rutas de las imágenes (separadas por '!')" autoFocus="" onChange={(e) => setImagenes(e.target.value.split("!"))} />
                <textarea className="form-control" name="categorias" placeholder="Categorías (separadas por '!')" autoFocus="" onChange={(e) => setCategorias(e.target.value.split("!"))} />
                <input className="form-control" type="number" name="cantidadStokXS" placeholder="Cantidad stok tallas XS" onChange={(e) => setCantidadStokXS(e.target.value)} />
                <input className="form-control" type="number" name="cantidadStokS" placeholder="Cantidad stok tallas S" onChange={(e) => setCantidadStokS(e.target.value)} />
                <input className="form-control" type="number" name="cantidadStokM" placeholder="Cantidad stok tallas M" onChange={(e) => setCantidadStokM(e.target.value)} />
                <input className="form-control" type="number" name="cantidadStokL" placeholder="Cantidad stok tallas L" onChange={(e) => setCantidadStokL(e.target.value)} />
                <input className="form-control" type="number" name="cantidadStokXL" placeholder="Cantidad stok tallas XL" onChange={(e) => setCantidadStokXL(e.target.value)} />

                <button className="btn btn-lg btn-primary btn-block" type="submit">Crear producto</button>
            </form>
        </div>
    );
}

export default ManageProductosScreen;