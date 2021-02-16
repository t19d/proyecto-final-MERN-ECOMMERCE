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

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(guardarEnvio({ nombre, apellidos, dni, telefono, direccion, codigoPostal, pais, provincia, email }));
        props.history.push('/pago');
    };

    return (
        <div>
            <CheckoutPasos paso1 paso2></CheckoutPasos>
            <div className="text-center container-sm" onSubmit={submitHandler}>
                <h1 className="text-center tituloPagina">Envío</h1>
                <form className="formRegistro">
                    <input id="inputNombre" className="form-control" type="text" value={nombre} placeholder="Nombre" required autoFocus onChange={(e) => setNombre(e.target.value)} />
                    <input id="inputApellidos" className="form-control" type="text" value={apellidos} placeholder="Apellidos" required onChange={(e) => setApellidos(e.target.value)} />
                    <input id="inputDni" className="form-control" type="text" value={dni} placeholder="Dni - Nif - Cif - Pasaporte" required onChange={(e) => setDni(e.target.value)} />
                    <input id="inputTelefono" className="form-control" type="text" value={telefono} placeholder="Teléfono" required onChange={(e) => setTelefono(e.target.value)} />
                    <input id="inputDirección" className="form-control" type="text" value={direccion} placeholder="Dirección" required onChange={(e) => setDireccion(e.target.value)} />
                    <input id="inputCodigoPostal" className="form-control" type="text" value={codigoPostal} placeholder="Código postal" required onChange={(e) => setCodigoPostal(e.target.value)} />
                    <input id="inputPais" className="form-control" type="text" value={pais} placeholder="País" required onChange={(e) => setPais(e.target.value)} />
                    <input id="inputProvincia" className="form-control" type="text" value={provincia} placeholder="Provincia" required onChange={(e) => setProvincia(e.target.value)} />
                    <input id="inputEmail" className="form-control" type="email" value={email} placeholder="Email" required onChange={(e) => setEmail(e.target.value)} />
                    <button className="btn btn-lg btn-primary btn-block" type="submit">Continuar</button>
                </form>
            </div>
        </div>
    );
}

export default EnvioScreen;