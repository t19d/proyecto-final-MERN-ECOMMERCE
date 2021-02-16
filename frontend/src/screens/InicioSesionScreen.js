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
        <div className="text-center container" onSubmit={submitHandler}>
            <h1 className="text-center tituloPagina">Iniciar sesión</h1>
            {loading && <div className="d-flex justify-content-center"><img src="/images/recursos_web/loading.gif" alt="Cargando" /></div>}
            {error && <div>{error}</div>}
            <form className="formInicioSesion">
                <input id="inputEmail" className="form-control" type="email" name="email" placeholder="Email" required autoFocus="" onChange={(e) => setEmail(e.target.value)} />
                <input id="inputPassword" className="form-control" type="password" name="password" placeholder="Contraseña" required onChange={(e) => setPassword(e.target.value)} />
                <button className="btn btn-lg btn-primary btn-block" type="submit">Acceder</button>
                <div>
                    <div>¿No tienes usuario?</div>
                    <Link to={redirect === "/" ? "registro" : "registro?redirect=" + redirect}>Crear nueva cuenta de usuario</Link>
                </div>
            </form>
        </div>
    );
}

export default InicioSesionScreen;