import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { guardarPago } from '../actions/carritoAcciones';
import CheckoutPasos from '../components/CheckoutPasos';

function PagoScreen(props) {
    const [metodoPago, setMetodoPago] = useState('');

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
                <h1>Pago</h1>
                <form className="formRegistro">
                    <input type="radio" name="metodoPago" id="metodoPago" value="Paypal" onChange={(e) => setMetodoPago(e.target.value)}></input>
                    <label htmlFor="metodoPago">Paypal</label>

                    <button className="btn btn-lg btn-primary btn-block" type="submit">Continuar</button>
                </form>
            </div>
        </div>
    );
}

export default PagoScreen;