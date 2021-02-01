import axios from "axios"
import { ANHADIR_ITEM_AL_CARRITO, ELIMINAR_ITEM_DEL_CARRITO } from "../constants/carritoConstantes";

const anhadirAlCarrito = (productoId, cantidad) => async (dispatch) => {
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
    } catch (error) {
    }
}

const eliminarDelCarrito = (productoId) => (dispatch) => {
    dispatch({ type: ELIMINAR_ITEM_DEL_CARRITO, payload: productoId });
}

export { anhadirAlCarrito, eliminarDelCarrito }