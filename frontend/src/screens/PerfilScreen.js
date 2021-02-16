import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function PerfilScreen(props) {
    const usuarioInicioSesion = useSelector(state => state.usuarioInicioSesion);
    const { usuarioInfo } = usuarioInicioSesion;

    const usuarioDetalles = useSelector((state) => state.usuarioDetalles);
    const { usuario } = usuarioDetalles;

    return (
        <div className="container">
            <h1 className="text-center tituloPagina">Perfil de {usuario ? usuario.nombre : usuarioInfo.nombre}</h1>
            <ul className="panelOpcionesPerfil row">
                <li className="col-md-6 col-sm-12 col-xs-12 opcionDatosUsuario">
                    <div>
                        <h3>Datos de usuario</h3>
                        <ul>
                            <li><Link to={"/editarusuario/" + usuarioInfo._id} className="enlaceOpcionesUsuario">Modificar mis datos</Link></li>
                            <li><Link to={"/cambiarcontrasenha/" + usuarioInfo._id} className="enlaceOpcionesUsuario">Cambiar contraseña</Link></li>
                        </ul>
                    </div>
                </li>
                <li className="col-md-6 col-sm-12 col-xs-12 opcionMisPedidos">
                    <div>
                        <h3>Mis pedidos</h3>
                        <ul>
                            <li><Link to="/pedidos" className="enlaceOpcionesUsuario">Ver mis pedidos</Link></li>
                        </ul>
                    </div>
                </li>
            </ul>
        </div>
    );
}

export default PerfilScreen;