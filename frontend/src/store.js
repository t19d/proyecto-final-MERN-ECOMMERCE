import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from "redux-thunk";
import Cookie from "js-cookie";
import { carritoReducer } from './reducers/carritoReducers';
import { listaProductosReducer, productoDetallesReducer } from './reducers/productoReducers';

const carritoItems = Cookie.getJSON("carritoItems") || [];

const initialState = { carrito: { carritoItems } };
const reducer = combineReducers({
    listaProductos: listaProductosReducer,
    productoDetalles: productoDetallesReducer,
    carrito: carritoReducer
});

{/* Usar herramienta de Chrome de Redux. */ }
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));
export default store;