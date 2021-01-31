import { LISTA_PRODUCTOS_FAIL, LISTA_PRODUCTOS_REQUEST, LISTA_PRODUCTOS_SUCCESS, PRODUCTO_DETALLES_FAIL, PRODUCTO_DETALLES_REQUEST, PRODUCTO_DETALLES_SUCCESS } from "../constants/productoConstantes";

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

function productoDetallesReducer(state = { producto: {} }, action) {
    switch (action.type) {
        case PRODUCTO_DETALLES_REQUEST:
            return { loading: true };
        case PRODUCTO_DETALLES_SUCCESS:
            return { loading: false, producto: action.payload };
        case PRODUCTO_DETALLES_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export { listaProductosReducer, productoDetallesReducer }