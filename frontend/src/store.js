import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { listaProductosReducer } from './reducers/productoReducers';

const initialState = {};
const reducer = combineReducers({
    listaProductos: listaProductosReducer,
});

const store = createStore(reducer, initialState, compose(applyMiddleware(thunk)));
export default store;