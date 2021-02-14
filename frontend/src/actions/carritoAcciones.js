import axios from "axios"
import Cookie from "js-cookie";
import { ANHADIR_ITEM_AL_CARRITO, ELIMINAR_ITEM_DEL_CARRITO, CARRITO_GUARDAR_ENVIO, CARRITO_GUARDAR_PAGO, VACIAR_CARRITO } from "../constants/carritoConstantes";

const anhadirAlCarrito = (productoId, cantidad, talla) => async (dispatch, getState) => {
    try {
        const { data } = await axios.get("/api/productos/" + productoId);
        var cantidadStock = 0;
        switch (talla) {
            case "XS":
                cantidadStock = data.cantidadStockXS;
            case "S":
                cantidadStock = data.cantidadStockS;
            case "M":
                cantidadStock = data.cantidadStockM;
            case "L":
                cantidadStock = data.cantidadStockL;
            case "XL":
                cantidadStock = data.cantidadStockXL;
        }
        dispatch({
            type: ANHADIR_ITEM_AL_CARRITO,
            payload: {
                producto: data._id,
                nombre: data.nombre,
                miniatura: data.miniatura,
                precio: data.precio,
                precioOferta: data.precioOferta,
                cantidadStock: cantidadStock,
                cantidad: cantidad,
                talla: talla
            }
        });
        const { carrito: { carritoItems } } = getState();
        /* COOKIES */
        //Cookie.set("carritoItems", JSON.stringify(carritoItems));
        /* localstorage */
        localStorage.setItem('carritoItems', JSON.stringify(carritoItems));
    } catch (error) {
    }
}

const vaciarCarrito = () => (dispatch) => {
    dispatch({ type: VACIAR_CARRITO });

    /* COOKIES */
    //Cookie.remove("carritoItems");
    //Cookie.set("carritoItems", JSON.stringify(""));
    /* localstorage */
    localStorage.removeItem('carritoItems');
}

const eliminarDelCarrito = (productoId) => (dispatch, getState) => {
    dispatch({ type: ELIMINAR_ITEM_DEL_CARRITO, payload: productoId });

    const { carrito: { carritoItems } } = getState();
    /* COOKIES */
    //Cookie.set("carritoItems", JSON.stringify(carritoItems));
    /* localstorage */
    localStorage.setItem('carritoItems', JSON.stringify(carritoItems));
}

const guardarEnvio = (data) => (dispatch) => {
    dispatch({ type: CARRITO_GUARDAR_ENVIO, payload: data });
}

const guardarPago = (data) => (dispatch) => {
    dispatch({ type: CARRITO_GUARDAR_PAGO, payload: data });
}

export { anhadirAlCarrito, eliminarDelCarrito, guardarEnvio, guardarPago, vaciarCarrito }