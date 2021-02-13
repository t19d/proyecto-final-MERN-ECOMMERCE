import axios from "axios"
import Cookie from "js-cookie";
import { ANHADIR_ITEM_AL_CARRITO, ELIMINAR_ITEM_DEL_CARRITO, CARRITO_GUARDAR_ENVIO, CARRITO_GUARDAR_PAGO } from "../constants/carritoConstantes";

const anhadirAlCarrito = (productoId, cantidad) => async (dispatch, getState) => {
    try {
        const { data } = await axios.get("/api/productos/" + productoId);
        dispatch({
            type: ANHADIR_ITEM_AL_CARRITO,
            payload: {
                producto: data._id,
                nombre: data.nombre,
                miniatura: data.miniatura,
                precio: data.precio,
                cantidadStockL: data.cantidadStockL,
                cantidad
            }
        });
        /* COOKIES */
        const { carrito: { carritoItems } } = getState();
        Cookie.set("carritoItems", JSON.stringify(carritoItems));

    } catch (error) {
    }
}

const eliminarDelCarrito = (productoId) => (dispatch, getState) => {
    dispatch({ type: ELIMINAR_ITEM_DEL_CARRITO, payload: productoId });

    /* COOKIES */
    const { carrito: { carritoItems } } = getState();
    Cookie.set("carritoItems", JSON.stringify(carritoItems));
}

const guardarEnvio = (data) => (dispatch) => {
    dispatch({ type: CARRITO_GUARDAR_ENVIO, payload: data });
}

const guardarPago = (data) => (dispatch) => {
    dispatch({ type: CARRITO_GUARDAR_PAGO, payload: data });
}

export { anhadirAlCarrito, eliminarDelCarrito, guardarEnvio, guardarPago }