import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { guardarEnvio } from '../actions/carritoAcciones';
import CheckoutPasos from '../components/CheckoutPasos';

function EnvioScreen(props) {

    const usuarioInicioSesion = useSelector(state => state.usuarioInicioSesion);
    const { usuarioInfo } = usuarioInicioSesion;

    // Si no ha iniciado sesión, se envía
    if (!usuarioInfo) {
        props.history.push('/iniciosesion');
    }

    const carrito = useSelector(state => state.carrito);
    const { carritoItems, envio } = carrito;

    // Si el carrito está vacío, se envía
    if (carritoItems.length === 0) {
        props.history.push('/carrito');
    }

    const [nombre, setNombre] = useState((envio) ? envio.nombre : "");
    const [apellidos, setApellidos] = useState((envio) ? envio.apellidos : "");
    const [dni, setDni] = useState((envio) ? envio.dni : "");
    const [telefono, setTelefono] = useState((envio) ? envio.telefono : "");
    const [direccion, setDireccion] = useState((envio) ? envio.direccion : "");
    const [codigoPostal, setCodigoPostal] = useState((envio) ? envio.codigoPostal : "");
    const [pais, setPais] = useState((envio) ? envio.pais : "");
    const [provincia, setProvincia] = useState((envio) ? envio.provincia : "");
    const [email, setEmail] = useState((envio) ? envio.email : "");

    const dispatch = useDispatch();

    const volerACarrito = () => {
        props.history.push('/carrito');
    };

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(guardarEnvio({ nombre, apellidos, dni, telefono, direccion, codigoPostal, pais, provincia, email }));
        props.history.push('/pago');
    };

    return (
        <div>
            <CheckoutPasos paso1 paso2></CheckoutPasos>
            <div className="container-sm" onSubmit={submitHandler}>
                <h1 className="text-center tituloPagina">Envío</h1>
                <form className="formRegistro">
                    <label forhtml="inputNombre" className="labelFormularioUsuario">Nombre:</label>
                    <input id="inputNombre" className="form-control inputFormularioUsuario" type="text" value={nombre} placeholder="Nombre" required autoFocus onChange={(e) => setNombre(e.target.value)} />
                    <label forhtml="inputApellidos" className="labelFormularioUsuario">Apellidos:</label>
                    <input id="inputApellidos" className="form-control inputFormularioUsuario" type="text" value={apellidos} placeholder="Apellidos" required onChange={(e) => setApellidos(e.target.value)} />
                    <label forhtml="inputDni" className="labelFormularioUsuario">Dni - Nif - Cif - Pasaporte:</label>
                    <input id="inputDni" className="form-control inputFormularioUsuario" type="text" value={dni} placeholder="Dni - Nif - Cif - Pasaporte" required onChange={(e) => setDni(e.target.value)} />
                    <label forhtml="inputTelefono" className="labelFormularioUsuario">Teléfono:</label>
                    <input id="inputTelefono" className="form-control inputFormularioUsuario" type="text" value={telefono} placeholder="Teléfono" required onChange={(e) => setTelefono(e.target.value)} />
                    <label forhtml="inputDirección" className="labelFormularioUsuario">Dirección:</label>
                    <input id="inputDirección" className="form-control inputFormularioUsuario" type="text" value={direccion} placeholder="Dirección" required onChange={(e) => setDireccion(e.target.value)} />
                    <label forhtml="inputCodigoPostal" className="labelFormularioUsuario">Código postal:</label>
                    <input id="inputCodigoPostal" className="form-control inputFormularioUsuario" type="text" value={codigoPostal} placeholder="Código postal" required onChange={(e) => setCodigoPostal(e.target.value)} />
                    <label forhtml="inputPais" className="labelFormularioUsuario">País:</label>
                    <input id="inputPais" className="form-control inputFormularioUsuario" type="text" value={pais} placeholder="País" required onChange={(e) => setPais(e.target.value)} />
                    <label forhtml="inputProvincia" className="labelFormularioUsuario">Provincia:</label>
                    <input id="inputProvincia" className="form-control inputFormularioUsuario" type="text" value={provincia} placeholder="Provincia" required onChange={(e) => setProvincia(e.target.value)} />
                    <label forhtml="inputEmail" className="labelFormularioUsuario">Email:</label>
                    <input id="inputEmail" className="form-control inputFormularioUsuario" type="email" value={email} placeholder="Email" required onChange={(e) => setEmail(e.target.value)} />
                    <div className="row filaBotones">
                        <div className="col-sm-12 col-xs-12 col-md-6 text-center">
                            <button onClick={volerACarrito} className="btn filaBotonesCancelar">Volver</button>
                        </div>
                        <div className="col-sm-12 col-xs-12 col-md-6 text-center">
                            <button className="btn filaBotonesAceptar" type="submit">Continuar</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EnvioScreen;