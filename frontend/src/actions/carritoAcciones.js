import axios from "axios"
import Cookie from "js-cookie";
import { ANHADIR_ITEM_AL_CARRITO, ELIMINAR_ITEM_DEL_CARRITO } from "../constants/carritoConstantes";

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
                cantidadStokL: data.cantidadStokL,
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

export { anhadirAlCarrito, eliminarDelCarrito }