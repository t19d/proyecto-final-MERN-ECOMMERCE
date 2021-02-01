import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from "redux-thunk";
import { carritoReducer } from './reducers/carritoReducers';
import { listaProductosReducer, productoDetallesReducer } from './reducers/productoReducers';

const initialState = {};
const reducer = combineReducers({
    listaProductos: listaProductosReducer,
    productoDetalles: productoDetallesReducer,
    carrito: carritoReducer
});

{/* Usar herramienta de Chrome de Redux. */}
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));
export default store;