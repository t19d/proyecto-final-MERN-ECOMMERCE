import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { carritoReducer } from './reducers/carritoReducers';
import { listaProductosReducer, productoDetallesReducer, productoEliminadoReducer, productoGuardadoReducer } from './reducers/productoReducers';
import { usuarioActualizacionReducer, usuarioInicioSesionReducer, usuarioRegistroReducer, usuarioDetallesReducer } from './reducers/usuarioReducers';
import { listaPedidosReducer, listaPedidosUsuarioReducer, pedidoCreadoReducer, pedidoDetallesReducer } from './reducers/pedidoReducers';

/* COOKIES */
//const carritoItems = Cookie.getJSON('carritoItems') || [];
//const usuarioInfo = Cookie.getJSON('usuarioInfo') || null;

/* localStorage */
const usuarioInfo = JSON.parse(localStorage.getItem('usuarioInfo')) || null;
const carrito = {
    carritoItems: localStorage.getItem('carritoItems') ? JSON.parse(localStorage.getItem('carritoItems')) : [],
    envio: localStorage.getItem('envio') ? JSON.parse(localStorage.getItem('envio')) : {},
    pago: { metodoPago: 'PayPal' },
};

const initialState = { carrito: carrito, usuarioInicioSesion: { usuarioInfo } };
const reducer = combineReducers({
    listaProductos: listaProductosReducer,
    productoDetalles: productoDetallesReducer,
    productoGuardado: productoGuardadoReducer,
    productoEliminado: productoEliminadoReducer,
    carrito: carritoReducer,
    usuarioInicioSesion: usuarioInicioSesionReducer,
    usuarioRegistro: usuarioRegistroReducer,
    pedidoCreado: pedidoCreadoReducer,
    pedidoDetalles: pedidoDetallesReducer,
    listaPedidosUsuario: listaPedidosUsuarioReducer,
    listaPedidos: listaPedidosReducer,
    usuarioActualizacion: usuarioActualizacionReducer,
    usuarioDetalles: usuarioDetallesReducer
});

/* Usar herramienta de Chrome de Redux. */ 
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));
export default store;