import axios from 'axios';
import Cookie from 'js-cookie';
import { USUARIO_INICIOSESION_FAIL, USUARIO_INICIOSESION_REQUEST, USUARIO_INICIOSESION_SUCCESS } from '../constants/usuarioConstantes';

const iniciarSesion = (email, password) => async (dispatch) => {
    dispatch({ type: USUARIO_INICIOSESION_REQUEST, payload: { email, password } });
    try {
        const { data } = await axios.post("/api/usuarios/iniciosesion", { email, password });
        dispatch({ type: USUARIO_INICIOSESION_SUCCESS, payload: data });
        Cookie.set('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({ type: USUARIO_INICIOSESION_FAIL, payload: error.message });
    }
}

export { iniciarSesion }