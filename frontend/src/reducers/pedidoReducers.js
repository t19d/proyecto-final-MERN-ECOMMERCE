import {
    PEDIDO_CREADO_REQUEST,
    PEDIDO_CREADO_SUCCESS,
    PEDIDO_CREADO_FAIL,
    PEDIDO_CREADO_RESET,
    PEDIDO_DETALLES_REQUEST,
    PEDIDO_DETALLES_SUCCESS,
    PEDIDO_DETALLES_FAIL,
    LISTA_PEDIDOS_USUARIO_REQUEST,
    LISTA_PEDIDOS_USUARIO_SUCCESS,
    LISTA_PEDIDOS_USUARIO_FAIL,
    LISTA_PEDIDOS_REQUEST,
    LISTA_PEDIDOS_SUCCESS,
    LISTA_PEDIDOS_FAIL
} from '../constants/pedidoConstantes';

export const pedidoCreadoReducer = (state = {}, action) => {
    switch (action.type) {
        case PEDIDO_CREADO_REQUEST:
            return { loading: true };
        case PEDIDO_CREADO_SUCCESS:
            return { loading: false, success: true, order: action.payload };
        case PEDIDO_CREADO_FAIL:
            return { loading: false, error: action.payload };
        case PEDIDO_CREADO_RESET:
            return {};
        default:
            return state;
    }
};

export const pedidoDetallesReducer = (state = { loading: true }, action) => {
    switch (action.type) {
        case PEDIDO_DETALLES_REQUEST:
            return { loading: true };
        case PEDIDO_DETALLES_SUCCESS:
            return { loading: false, order: action.payload };
        case PEDIDO_DETALLES_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const listaPedidosUsuarioReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case LISTA_PEDIDOS_USUARIO_REQUEST:
            return { loading: true };
        case LISTA_PEDIDOS_USUARIO_SUCCESS:
            return { loading: false, orders: action.payload };
        case LISTA_PEDIDOS_USUARIO_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
export const listaPedidosReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case LISTA_PEDIDOS_REQUEST:
            return { loading: true };
        case LISTA_PEDIDOS_SUCCESS:
            return { loading: false, orders: action.payload };
        case LISTA_PEDIDOS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};