import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actualizarUsuario, cerrarSesion, detallesUsuario } from '../actions/usuarioAcciones';
import { USUARIO_MODIFICARDATOS_RESET } from '../constants/usuarioConstantes';

function ModificarContrasenhaUsuarioScreen(props) {

    const usuarioInicioSesion = useSelector(state => state.usuarioInicioSesion);
    const { usuarioInfo } = usuarioInicioSesion;

    const usuarioDetalles = useSelector((state) => state.usuarioDetalles);
    const { loading, error, usuario } = usuarioDetalles;

    const usuarioId = usuario ? usuario._id : usuarioInfo._id;
    //const [oldPassword, setOldPassword] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    console.log(usuario);

    const usuarioActualizacion = useSelector((state) => state.usuarioActualizacion);
    const { loading: loadingActualizacion, error: errorActualizacion, success: successActualizacion, } = usuarioActualizacion;

    const submitHandler = (e) => {
        e.preventDefault();
        // Comprobar que la contraseña antigua es la activa
        /*if (usuario.password === oldPassword) {
        if (oldPassword != password) {*/
        if (password === rePassword) {
            if (window.confirm("¿Está seguro que quiere cambiar su contraseña?")) {
                dispatch(actualizarUsuario({
                    _id: usuarioId, isAdmin: isAdmin, nombre: usuario.nombre, email: usuario.email, password: password
                }));
            }
        } else {
            alert("Las contraseñas no coinciden.");
        }
        /*} else {
            alert("La contraseña nueva no puede ser la misma que la antigua.");
        }
        } else {
            alert("La contraseña antigua no coincide.");
        }*/
    };

    const volverPerfil = () => {
        props.history.push("/perfil");
    }

    const dispatch = useDispatch();
    useEffect(() => {
        if (successActualizacion) {
            dispatch({ type: USUARIO_MODIFICARDATOS_RESET });
            if (!loadingActualizacion) {
                dispatch(detallesUsuario(usuarioId));
                dispatch(cerrarSesion());
            }
        }
        if (!usuario) {
            dispatch(detallesUsuario(usuarioId));
        } else {
            setIsAdmin(usuario.isAdmin);
        }
    }, [dispatch, props.history, successActualizacion, usuario, usuarioId, loadingActualizacion]);

    return (
        <div className="container-sm" onSubmit={submitHandler}>
            <h1 className="text-center tituloPagina">Cambiar contraseña</h1>
            {loading && <div className="d-flex justify-content-center"><img src="/images/recursos_web/loading.gif" alt="Cargando" /></div>}
            {error && <div className="text-danger text-center">{error}</div>}
            {loadingActualizacion && <div className="d-flex justify-content-center"><img src="/images/recursos_web/loading.gif" alt="Cargando" /></div>}
            {errorActualizacion && <div>{errorActualizacion}</div>}
            <form className="formRegistro">
                {/*<input id="inputOldPass" className="form-control" type="password" value={oldPassword} placeholder="Antigua contraseña" required autoFocus onChange=
                {(e) => setOldPassword(e.target.value)}
                />*/}
                <label forhtml="inputPass" className="labelFormularioUsuario">Contraseña:</label>
                <input id="inputPass" className="form-control inputFormularioUsuario" type="password" value={password} placeholder="Nueva contraseña" required onChange={(e) => setPassword(e.target.value)} />
                <label forhtml="inputRePass" className="labelFormularioUsuario">Repita la contraseña:</label>
                <input id="inputRePass" className="form-control inputFormularioUsuario" type="password" value={rePassword} placeholder="Repita la contraseña" required onChange={(e) => setRePassword(e.target.value)} />
                <div className="row filaBotones text-center">
                    <div className="col-md-6 col-sm-6 col-xs-12">
                        <button className="btn filaBotonesCancelar" onClick={volverPerfil}>Cancelar</button>
                    </div>
                    <div className="col-md-6 col-sm-6 col-xs-12">
                        <button className="btn filaBotonesAceptar" type="submit">Confirmar</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default ModificarContrasenhaUsuarioScreen;