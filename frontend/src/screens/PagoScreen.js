import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { guardarPago } from '../actions/carritoAcciones';
import CheckoutPasos from '../components/CheckoutPasos';

function PagoScreen(props) {
    const usuarioInicioSesion = useSelector(state => state.usuarioInicioSesion);
    const { usuarioInfo } = usuarioInicioSesion;

    // Si no ha iniciado sesión, se envía
    if (!usuarioInfo) {
        props.history.push('/iniciosesion');
    }

    const carrito = useSelector(state => state.carrito);
    const { carritoItems, pago, envio } = carrito;

    // Si el carrito está vacío, se envía
    if (carritoItems.length === 0) {
        props.history.push('/carrito');
    }

    // Si el envío está vacío, se envía
    if (!envio) {
        props.history.push('/envio');
    }

    const [metodoPago, setMetodoPago] = useState((pago) ? pago.metodoPago : 'PayPal');

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(guardarPago({ metodoPago }));
        props.history.push('finalizarpedido');
    };

    return (
        <div>
            <CheckoutPasos paso1 paso2 paso3></CheckoutPasos>
            <div className="text-center container-sm" onSubmit={submitHandler}>
                <h1 className="text-center tituloPagina">Pago</h1>
                <form className="formRegistro">
                    <input type="radio" name="metodoPago" id="metodoPago" value="PayPal" checked onChange={(e) => setMetodoPago(e.target.value)}></input>
                    <label htmlFor="metodoPago">PayPal</label>

                    <button className="btn btn-lg btn-primary btn-block" type="submit">Continuar</button>
                </form>
            </div>
        </div>
    );
}

export default PagoScreen;