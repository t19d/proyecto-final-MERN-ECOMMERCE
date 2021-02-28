import axios from 'axios';
import { VACIAR_CARRITO } from '../constants/carritoConstantes';
import {
    PEDIDO_CREADO_REQUEST,
    PEDIDO_CREADO_SUCCESS,
    PEDIDO_CREADO_FAIL,
    PEDIDO_DETALLES_REQUEST,
    PEDIDO_DETALLES_SUCCESS,
    PEDIDO_DETALLES_FAIL,
    LISTA_PEDIDOS_REQUEST,
    LISTA_PEDIDOS_SUCCESS,
    LISTA_PEDIDOS_FAIL,
    LISTA_PEDIDOS_USUARIO_SUCCESS,
    LISTA_PEDIDOS_USUARIO_FAIL,
    LISTA_PEDIDOS_USUARIO_REQUEST
} from '../constants/pedidoConstantes';

export const crearPedido = (pedido) => async (dispatch, getState) => {
    dispatch({ type: PEDIDO_CREADO_REQUEST, payload: pedido });
    try {
        const { usuarioInicioSesion: { usuarioInfo } } = getState();
        const { data } = await axios.post("/api/pedidos", pedido, {
            headers: {
                Authorization: 'Bearer ' + usuarioInfo.token
            }
        });
        dispatch({ type: PEDIDO_CREADO_SUCCESS, payload: data.pedido });
        dispatch({ type: VACIAR_CARRITO });
        /* localstorage */
        localStorage.removeItem('carritoItems');
        localStorage.removeItem('envio');
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({ type: PEDIDO_CREADO_FAIL, payload: message });
    }
};

export const hacerPedidoDetalles = (pedidoId) => async (dispatch, getState) => {
    dispatch({ type: PEDIDO_DETALLES_REQUEST, payload: pedidoId });
    const { usuarioInicioSesion: { usuarioInfo } } = getState();
    try {
        const { data } = await axios.get("/api/pedidos/" + pedidoId, {
            headers: {
                Authorization: 'Bearer ' + usuarioInfo.token
            }
        });
        dispatch({ type: PEDIDO_DETALLES_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({ type: PEDIDO_DETALLES_FAIL, payload: message });
    }
};

export const hacerListaPedidosUsuario = () => async (dispatch, getState) => {
    dispatch({ type: LISTA_PEDIDOS_USUARIO_REQUEST });
    const { usuarioInicioSesion: { usuarioInfo } } = getState();
    try {
        const { data } = await axios.get('/api/pedidos/usuario', {
            headers: {
                Authorization: 'Bearer ' + usuarioInfo.token
            }
        });
        dispatch({ type: LISTA_PEDIDOS_USUARIO_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({ type: LISTA_PEDIDOS_USUARIO_FAIL, payload: message });
    }
};

export const hacerListaPedidos = () => async (dispatch, getState) => {
    dispatch({ type: LISTA_PEDIDOS_REQUEST });
    const { usuarioInicioSesion: { usuarioInfo } } = getState();
    try {
        const { data } = await axios.get("/api/pedidos", {
            headers: {
                Authorization: 'Bearer ' + usuarioInfo.token
            }
        });
        console.log(data);
        dispatch({ type: LISTA_PEDIDOS_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({ type: LISTA_PEDIDOS_FAIL, payload: message });
    }
};