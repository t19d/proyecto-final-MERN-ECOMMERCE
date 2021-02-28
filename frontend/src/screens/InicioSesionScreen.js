import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { iniciarSesion } from '../actions/usuarioAcciones';

function InicioSesionScreen(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const usuarioInicioSesion = useSelector(state => state.usuarioInicioSesion);
    const { loading, usuarioInfo, error } = usuarioInicioSesion;
    const dispatch = useDispatch();

    const redirect = props.location.search ? props.location.search.split("=")[1] : "/";

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(iniciarSesion(email, password));
    };

    useEffect(() => {
        if (usuarioInfo) {
            props.history.push(redirect);
        }
        return () => {
            //
        };
    }, [props.history, redirect, usuarioInfo]);

    return (
        <div className="container" onSubmit={submitHandler}>
            <h1 className="text-center tituloPagina">Iniciar sesión</h1>
            {loading && <div className="d-flex justify-content-center"><img src="/images/recursos_web/loading.gif" alt="Cargando" /></div>}
            {error && <div className="text-danger text-center">{error}</div>}
            <form className="formInicioSesion">
                <label forHtml="inputEmail" className="labelFormularioUsuario">Email:</label>
                <input id="inputEmail" className="form-control inputFormularioUsuario" type="email" name="email" placeholder="Email" required autoFocus onChange={(e) => setEmail(e.target.value)} />
                <label forHtml="inputEmail" className="labelFormularioUsuario">Contraseña:</label>
                <input id="inputPassword" minLength="8" className="form-control inputFormularioUsuario" type="password" name="password" placeholder="Contraseña" required onChange={(e) => setPassword(e.target.value)} />
                <div className="text-center">
                    <button className="btn botonFormularioUsuario" type="submit">Acceder</button>
                    <div>¿No tienes usuario?</div>
                    <Link to={redirect === "/" ? "registro" : "registro?redirect=" + redirect}>Crear nueva cuenta de usuario</Link>
                </div>
            </form>
        </div>
    );
}

export default InicioSesionScreen;