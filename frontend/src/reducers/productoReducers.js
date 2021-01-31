import { LISTA_PRODUCTOS_FAIL, LISTA_PRODUCTOS_REQUEST, LISTA_PRODUCTOS_SUCCESS } from "../constants/productoConstantes";

function listaProductosReducer(state = { productos: [] }, action) {
    switch (action.type) {
        case LISTA_PRODUCTOS_REQUEST:
            return { loading: true };
        case LISTA_PRODUCTOS_SUCCESS:
            return { loading: false, productos: action.payload };
        case LISTA_PRODUCTOS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export { listaProductosReducer }