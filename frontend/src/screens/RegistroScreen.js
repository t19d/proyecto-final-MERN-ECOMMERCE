import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { registrar } from '../actions/usuarioAcciones';

function RegistroScreen(props) {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const usuarioRegistro = useSelector(state => state.usuarioRegistro);
    const { loading, usuarioInfo, error } = usuarioRegistro;
    const dispatch = useDispatch();

    const redirect = props.location.search ? props.location.search.split("=")[1] : "/";

    const submitHandler = (e) => {
        e.preventDefault();

        if (password !== rePassword) {
            alert('Las contraseñas no coinciden.');
        } else {
            dispatch(registrar(nombre, email, password));
        }

    };

    useEffect(() => {
        if (usuarioInfo) {
            props.history.push(redirect);
        }
        return () => {
            //
        };
    }, [usuarioInfo]);

    return (
        <div className="container-sm" onSubmit={submitHandler}>
            <h1 className="text-center tituloPagina">Registrarse</h1>
            {loading && <div className="d-flex justify-content-center"><img src="/images/recursos_web/loading.gif" alt="Cargando" /></div>}
            {error && <div className="text-danger text-center">{error}</div>}
            <form className="formRegistro">
                <label forHtml="inputNombre" className="labelFormularioUsuario">Nombre:</label>
                <input id="inputNombre" className="form-control inputFormularioUsuario" type="text" name="name" placeholder="Nombre" required autoFocus onChange={(e) => setNombre(e.target.value)} />
                <label forHtml="inputEmail" className="labelFormularioUsuario">Email:</label>
                <input id="inputEmail" className="form-control inputFormularioUsuario" type="email" name="email" placeholder="Email" required onChange={(e) => setEmail(e.target.value)} />
                <label forHtml="inputPassword" className="labelFormularioUsuario">Contraseña:</label>
                <input id="inputPassword" minLength="8" className="form-control inputFormularioUsuario" type="password" name="password" placeholder="Contraseña" required onChange={(e) => setPassword(e.target.value)} />
                <label forHtml="inputRePassword" className="labelFormularioUsuario">Repita la contraseña:</label>
                <input id="inputRePassword" minLength="8" className="form-control inputFormularioUsuario" type="password" name="repassword" placeholder="Repita la contraseña" required onChange={(e) => setRePassword(e.target.value)} />
                <div className="text-center">
                    <button className="btn botonFormularioUsuario" type="submit">Crear usuario</button>
                    <div>¿Ya tienes usuario?</div>
                    <Link to={redirect === "/" ? "iniciosesion" : "registro?iniciosesion=" + redirect}>Iniciar sesión</Link>
                </div>
            </form>
        </div>
    );
}

export default RegistroScreen;