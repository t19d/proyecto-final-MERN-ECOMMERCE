import axios from 'axios';
import Cookie from 'js-cookie';
import { USUARIO_INICIOSESION_FAIL, USUARIO_INICIOSESION_REQUEST, USUARIO_INICIOSESION_SUCCESS, USUARIO_REGISTRO_FAIL, USUARIO_REGISTRO_REQUEST, USUARIO_REGISTRO_SUCCESS, USUARIO_CIERRESESION_SUCCESS } from '../constants/usuarioConstantes';

const iniciarSesion = (email, password) => async (dispatch) => {
    dispatch({ type: USUARIO_INICIOSESION_REQUEST, payload: { email, password } });
    try {
        const { data } = await axios.post("/api/usuarios/iniciosesion", { email, password });
        dispatch({ type: USUARIO_INICIOSESION_SUCCESS, payload: data });
        Cookie.set('usuarioInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({ type: USUARIO_INICIOSESION_FAIL, payload: error.message });
    }
}

const registrar = (nombre, email, password) => async (dispatch) => {
    dispatch({ type: USUARIO_REGISTRO_REQUEST, payload: { nombre, email, password } });
    try {
        const { data } = await axios.post("/api/usuarios/registro", { nombre, email, password });
        dispatch({ type: USUARIO_REGISTRO_SUCCESS, payload: data });
        Cookie.set('usuarioInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({ type: USUARIO_REGISTRO_FAIL, payload: error.message });
    }
}

const cerrarSesion = () => (dispatch) => {
    Cookie.remove('usuarioInfo');
    Cookie.remove('carritoItems');
    dispatch({ type: USUARIO_CIERRESESION_SUCCESS });
    document.location.href = '/';
};

export { iniciarSesion, registrar, cerrarSesion }