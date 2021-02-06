import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from "redux-thunk";
import Cookie from "js-cookie";
import { carritoReducer } from './reducers/carritoReducers';
import { listaProductosReducer, productoDetallesReducer, productoGuardadoReducer } from './reducers/productoReducers';
import { usuarioInicioSesionReducer, usuarioRegistroReducer } from './reducers/usuarioReducers';

const carritoItems = Cookie.getJSON("carritoItems") || [];
const usuarioInfo = Cookie.getJSON("usuarioInfo") || null;

const initialState = { carrito: { carritoItems }, usuarioInicioSesion: { usuarioInfo } };
const reducer = combineReducers({
    listaProductos: listaProductosReducer,
    productoDetalles: productoDetallesReducer,
    productoGuardado: productoGuardadoReducer,
    carrito: carritoReducer,
    usuarioInicioSesion: usuarioInicioSesionReducer,
    usuarioRegistro: usuarioRegistroReducer,
});

{/* Usar herramienta de Chrome de Redux. */ }
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));
export default store;