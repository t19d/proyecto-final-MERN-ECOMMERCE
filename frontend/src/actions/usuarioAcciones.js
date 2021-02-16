import axios from 'axios';
import {
    USUARIO_INICIOSESION_FAIL,
    USUARIO_INICIOSESION_REQUEST,
    USUARIO_INICIOSESION_SUCCESS,
    USUARIO_REGISTRO_FAIL,
    USUARIO_REGISTRO_REQUEST,
    USUARIO_REGISTRO_SUCCESS,
    USUARIO_CIERRESESION_SUCCESS,
    USUARIO_MODIFICARDATOS_REQUEST,
    USUARIO_MODIFICARDATOS_SUCCESS,
    USUARIO_MODIFICARDATOS_FAIL,
    USUARIO_DETALLES_REQUEST,
    USUARIO_DETALLES_SUCCESS,
    USUARIO_DETALLES_FAIL
} from '../constants/usuarioConstantes';

const iniciarSesion = (email, password) => async (dispatch) => {
    dispatch({ type: USUARIO_INICIOSESION_REQUEST, payload: { email, password } });
    try {
        const { data } = await axios.post("/api/usuarios/iniciosesion", { email, password });
        dispatch({ type: USUARIO_INICIOSESION_SUCCESS, payload: data });
        /* COOKIES */
        //Cookie.set('usuarioInfo', JSON.stringify(data));
        /* localstorage */
        localStorage.setItem('usuarioInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({ type: USUARIO_INICIOSESION_FAIL, payload: error.message });
    }
};

const registrar = (nombre, email, password) => async (dispatch) => {
    dispatch({ type: USUARIO_REGISTRO_REQUEST, payload: { nombre, email, password } });
    try {
        const { data } = await axios.post("/api/usuarios/registro", { nombre, email, password });
        dispatch({ type: USUARIO_REGISTRO_SUCCESS, payload: data });
        /* COOKIES */
        //Cookie.set('usuarioInfo', JSON.stringify(data));
        /* localstorage */
        localStorage.setItem('usuarioInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({ type: USUARIO_REGISTRO_FAIL, payload: error.message });
    }
};

const detallesUsuario = (usuarioId) => async (dispatch, getState) => {
    dispatch({ type: USUARIO_DETALLES_REQUEST, payload: usuarioId });
    const { usuarioInicioSesion: { usuarioInfo } } = getState();
    try {
        const { data } = await axios.get(`/api/usuarios/${usuarioId}`, {
            headers: {
                Authorization: 'Bearer ' + usuarioInfo.token
            }
        });
        dispatch({ type: USUARIO_DETALLES_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: USUARIO_DETALLES_FAIL, payload: error.message });
    }
};

const actualizarUsuario = (usuario) => async (dispatch, getState) => {
    dispatch({ type: USUARIO_MODIFICARDATOS_REQUEST, payload: usuario });
    const { usuarioInicioSesion: { usuarioInfo }, } = getState();
    try {
        const { data } = await axios.put(`/api/usuarios/${usuario._id}`, usuario, {
            headers: {
                Authorization: 'Bearer ' + usuarioInfo.token
            }
        });
        dispatch({ type: USUARIO_MODIFICARDATOS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: USUARIO_MODIFICARDATOS_FAIL, payload: error.message });
    }
};

const cerrarSesion = () => (dispatch) => {
    /* COOKIES */
    //Cookie.remove('usuarioInfo');
    //Cookie.remove('carritoItems');
    /* localStorage */
    localStorage.removeItem('usuarioInfo');
    localStorage.removeItem('carritoItems');
    localStorage.removeItem('envio');
    dispatch({ type: USUARIO_CIERRESESION_SUCCESS });
    document.location.href = '/';
};

export { iniciarSesion, registrar, cerrarSesion, actualizarUsuario, detallesUsuario }