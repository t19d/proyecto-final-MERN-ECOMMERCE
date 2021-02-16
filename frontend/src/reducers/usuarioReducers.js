import { USUARIO_DETALLES_FAIL, USUARIO_DETALLES_REQUEST, USUARIO_DETALLES_RESET, USUARIO_DETALLES_SUCCESS, USUARIO_INICIOSESION_FAIL, USUARIO_INICIOSESION_REQUEST, USUARIO_INICIOSESION_SUCCESS, USUARIO_MODIFICARDATOS_FAIL, USUARIO_MODIFICARDATOS_REQUEST, USUARIO_MODIFICARDATOS_RESET, USUARIO_MODIFICARDATOS_SUCCESS, USUARIO_REGISTRO_FAIL, USUARIO_REGISTRO_REQUEST, USUARIO_REGISTRO_SUCCESS } from "../constants/usuarioConstantes";

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

function usuarioRegistroReducer(state = {}, action) {
    switch (action.type) {
        case USUARIO_REGISTRO_REQUEST:
            return { loading: true };
        case USUARIO_REGISTRO_SUCCESS:
            return { loading: false, usuarioInfo: action.payload };
        case USUARIO_REGISTRO_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}


const usuarioActualizacionReducer = (state = {}, action) => {
    switch (action.type) {
        case USUARIO_MODIFICARDATOS_REQUEST:
            return { loading: true };
        case USUARIO_MODIFICARDATOS_SUCCESS:
            return { loading: false, success: true };
        case USUARIO_MODIFICARDATOS_FAIL:
            return { loading: false, error: action.payload };
        case USUARIO_MODIFICARDATOS_RESET:
            return {};
        default:
            return state;
    }
};


const usuarioDetallesReducer = (state = { loading: true }, action) => {
    switch (action.type) {
        case USUARIO_DETALLES_REQUEST:
            return { loading: true };
        case USUARIO_DETALLES_SUCCESS:
            return { loading: false, usuario: action.payload };
        case USUARIO_DETALLES_FAIL:
            return { loading: false, error: action.payload };
        case USUARIO_DETALLES_RESET:
            return { loading: true };
        default:
            return state;
    }
};

export { usuarioInicioSesionReducer, usuarioRegistroReducer, usuarioActualizacionReducer, usuarioDetallesReducer }