import { USUARIO_INICIOSESION_FAIL, USUARIO_INICIOSESION_REQUEST, USUARIO_INICIOSESION_SUCCESS } from "../constants/usuarioConstantes";

function usuarioInicioSesionReducer(state = {}, action) {
    switch (action.type) {
        case USUARIO_INICIOSESION_REQUEST:
            return { loading: true };
        case USUARIO_INICIOSESION_SUCCESS:
            return { loading: false, usuarioInfo: action.payload };
        case USUARIO_INICIOSESION_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export { usuarioInicioSesionReducer }