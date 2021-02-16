import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actualizarUsuario, detallesUsuario } from '../actions/usuarioAcciones';
import { USUARIO_MODIFICARDATOS_RESET } from '../constants/usuarioConstantes';

function ModificarDatosUsuarioScreen(props) {

    const usuarioDetalles = useSelector((state) => state.usuarioDetalles);
    const { loading, error, usuario } = usuarioDetalles;

    const usuarioId = usuario ? usuario._id : "";
    const [nombre, setNombre] = useState(usuario ? usuario.nombre : "");
    const [email, setEmail] = useState(usuario ? usuario.email : "");
    const [isAdmin, setIsAdmin] = useState(false);
    console.log(usuario);

    const usuarioActualizacion = useSelector((state) => state.usuarioActualizacion);
    const { loading: loadingActualizacion, error: errorActualizacion, success: successActualizacion, } = usuarioActualizacion;

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(actualizarUsuario(usuario));
    };

    const volverPerfil = () => {
        props.history.push("/perfil");
    }

    const dispatch = useDispatch();
    useEffect(() => {
        if (successActualizacion) {
            dispatch({ type: USUARIO_MODIFICARDATOS_RESET });
            volverPerfil();
        }
        if (!usuario) {
            dispatch(detallesUsuario(usuarioId));
        } else {
            setNombre(usuario.nombre);
            setEmail(usuario.email);
            setIsAdmin(usuario.isAdmin);
        }
    }, [dispatch, props.history, successActualizacion, usuario, usuarioId, loading]);

    return (
        <div className="text-center container-sm" onSubmit={submitHandler}>
            <h1 className="text-center tituloPagina">Editar datos usuario</h1>
            {loading && <div className="d-flex justify-content-center"><img src="/images/recursos_web/loading.gif" alt="Cargando" /></div>}
            {error && <div>{error}</div>}
            <form className="formRegistro">
                <input id="inputNombre" className="form-control" type="text" value={nombre} placeholder="Nombre" required autoFocus="" onChange={(e) => setNombre(e.target.value)} />
                <input id="inputEmail" className="form-control" type="email" value={email} placeholder="Email" required autoFocus="" onChange={(e) => setEmail(e.target.value)} />
                <div className="row">
                    <div className="col-md-6 col-sm-6 col-xs-12">
                        <button className="btn btn-lg btn-danger btn-block" type="submit">Cancelar</button>
                    </div>
                    <div className="col-md-6 col-sm-6 col-xs-12">
                        <button className="btn btn-lg btn-primary btn-block" onClick={volverPerfil} >Confirmar</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default ModificarDatosUsuarioScreen;