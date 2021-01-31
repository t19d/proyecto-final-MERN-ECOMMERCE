
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

export { listaProductosReducer }