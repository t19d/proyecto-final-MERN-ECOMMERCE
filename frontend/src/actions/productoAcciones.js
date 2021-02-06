import { LISTA_PRODUCTOS_FAIL, LISTA_PRODUCTOS_REQUEST, LISTA_PRODUCTOS_SUCCESS, PRODUCTO_DETALLES_FAIL, PRODUCTO_DETALLES_REQUEST, PRODUCTO_DETALLES_SUCCESS, PRODUCTO_GUARDADO_REQUEST, PRODUCTO_GUARDADO_SUCCESS, PRODUCTO_GUARDADO_FAIL } from "../constants/productoConstantes";
import axios from 'axios';

const hacerListaProductos = () => async (dispatch) => {
    try {
        dispatch({ type: LISTA_PRODUCTOS_REQUEST });
        const { data } = await axios.get("/api/productos");
        dispatch({ type: LISTA_PRODUCTOS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: LISTA_PRODUCTOS_FAIL, payload: error.message });
    }
}

const guardarProducto = (producto) => async (dispatch, getState) => {

    try {
        dispatch({ type: PRODUCTO_GUARDADO_REQUEST, payload: producto });
        const { usuarioInicioSesion: { usuarioInfo } } = getState();
        const { data } = await axios.post("/api/productos", producto, {
            headers: {
                'Authorization': 'Bearer' + usuarioInfo.token
            }
        });
        dispatch({ type: PRODUCTO_GUARDADO_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: PRODUCTO_GUARDADO_FAIL, payload: error.message });
    }
}

const hacerProductoDetalles = (productoId) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCTO_DETALLES_REQUEST, payload: productoId });
        console.log("/api/productos/" + productoId)
        const { data } = await axios.get("/api/productos/" + productoId);
        dispatch({ type: PRODUCTO_DETALLES_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: PRODUCTO_DETALLES_FAIL, payload: error.message });
    }
}

export { hacerListaProductos, hacerProductoDetalles, guardarProducto }