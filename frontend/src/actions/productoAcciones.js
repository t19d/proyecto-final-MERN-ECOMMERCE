import { LISTA_PRODUCTOS_FAIL, LISTA_PRODUCTOS_REQUEST, LISTA_PRODUCTOS_SUCCESS } from "../constants/productoConstantes";
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

export { hacerListaProductos }