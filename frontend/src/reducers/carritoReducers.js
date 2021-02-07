import { ANHADIR_ITEM_AL_CARRITO, CARRITO_GUARDAR_ENVIO, CARRITO_GUARDAR_PAGO, ELIMINAR_ITEM_DEL_CARRITO } from "../constants/carritoConstantes";

function carritoReducer(state = { carritoItems: [] }, action) {
    switch (action.type) {
        case ANHADIR_ITEM_AL_CARRITO:
            const item = action.payload;
            const producto = state.carritoItems.find(i => i.producto === item.producto);
            if (producto) {
                return {
                    carritoItems:
                        state.carritoItems.map(x => x.producto === producto.producto ? item : x)
                };
            }
            return { carritoItems: [...state.carritoItems, item] };
        case ELIMINAR_ITEM_DEL_CARRITO:
            return { carritoItems: state.carritoItems.filter(x => x.producto !== action.payload) }
        case CARRITO_GUARDAR_ENVIO:
            return { ...state, envio: action.payload }
        case CARRITO_GUARDAR_PAGO:
            return { ...state, pago: action.payload }
        default:
            return state;
    }
}

export { carritoReducer }