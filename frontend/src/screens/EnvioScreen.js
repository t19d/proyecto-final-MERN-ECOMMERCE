import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { guardarEnvio } from '../actions/carritoAcciones';
import CheckoutPasos from '../components/CheckoutPasos';

function EnvioScreen(props) {
    const [nombre, setNombre] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [dni, setDni] = useState('');
    const [telefono, setTelefono] = useState('');
    const [direccion, setDireccion] = useState('');
    const [codigoPostal, setCodigoPostal] = useState('');
    const [pais, setPais] = useState('');
    const [provincia, setProvincia] = useState('');
    const [email, setEmail] = useState('');

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(guardarEnvio({ nombre, apellidos, dni, telefono, direccion, codigoPostal, pais, provincia, email }));
        props.history.push('pago');
    };

    return (
        <div>
            <CheckoutPasos paso1 paso2></CheckoutPasos>
            <div className="text-center container-sm" onSubmit={submitHandler}>
                <h1>Envío</h1>
                <form className="formRegistro">
                    <input id="inputNombre" className="form-control" type="text" name="name" placeholder="Nombre" required="" autoFocus="" onChange={(e) => setNombre(e.target.value)} />
                    <input id="inputApellidos" className="form-control" type="text" name="apellidos" placeholder="Apellidos" required="" autoFocus="" onChange={(e) => setApellidos(e.target.value)} />
                    <input id="inputDni" className="form-control" type="text" name="dni" placeholder="Dni - Nif - Cif - Pasaporte" required="" autoFocus="" onChange={(e) => setDni(e.target.value)} />
                    <input id="inputTelefono" className="form-control" type="text" name="telefono" placeholder="Teléfono" required="" autoFocus="" onChange={(e) => setTelefono(e.target.value)} />
                    <input id="inputDirección" className="form-control" type="text" name="direccion" placeholder="Dirección" required="" autoFocus="" onChange={(e) => setDireccion(e.target.value)} />
                    <input id="inputCodigoPostal" className="form-control" type="text" name="codigoPostal" placeholder="Código postal" required="" autoFocus="" onChange={(e) => setCodigoPostal(e.target.value)} />
                    <input id="inputPais" className="form-control" type="text" name="pais" placeholder="País" required="" autoFocus="" onChange={(e) => setPais(e.target.value)} />
                    <input id="inputProvincia" className="form-control" type="text" name="provincia" placeholder="Provincia" required="" autoFocus="" onChange={(e) => setProvincia(e.target.value)} />
                    <input id="inputEmail" className="form-control" type="email" name="email" placeholder="Email" required="" autoFocus="" onChange={(e) => setEmail(e.target.value)} />
                    <button className="btn btn-lg btn-primary btn-block" type="submit">Continuar</button>
                </form>
            </div>
        </div>
    );
}

export default EnvioScreen;