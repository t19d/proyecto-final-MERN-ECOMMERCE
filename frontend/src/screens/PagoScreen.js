import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { guardarPago } from '../actions/carritoAcciones';
import CheckoutPasos from '../components/CheckoutPasos';

function PagoScreen(props) {
    // PAYPAL
    const [pagado, setPagado] = useState(false);
    const [error, setError] = useState(null);
    const paypalRef = useRef();

    const usuarioInicioSesion = useSelector(state => state.usuarioInicioSesion);
    const { usuarioInfo } = usuarioInicioSesion;

    // Si no ha iniciado sesión, se envía
    if (!usuarioInfo) {
        props.history.push('/iniciosesion');
    }

    const carrito = useSelector(state => state.carrito);
    const { carritoItems, pago, envio } = carrito;

    // Pagar
    const subtotal = Number.parseFloat(carritoItems.reduce((a, c) => a + c.precio * c.cantidad, 0).toFixed(2));
    const gastosEnvio = (subtotal >= 100) ? Number.parseFloat(0) : Number.parseFloat(6.99);
    const total = Number.parseFloat((subtotal + gastosEnvio).toFixed(2));

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

    const enviarHandler = () => {
        dispatch(guardarPago({ metodoPago }));
        props.history.push('finalizarpedido');
    };

    /*const confirmarPago = () => {
        setPagado(true);
    }*/

    useEffect(() => {
        window.paypal
            .Buttons({
                createOrder: (data, actions) => {
                    return actions.order.create({
                        intent: "CAPTURE",
                        purchase_units: [
                            {
                                description: "Club Pastoriza Balompié",
                                amount: {
                                    currency_code: "EUR",
                                    value: total,
                                },
                            },
                        ],
                    });
                },
                onApprove: async (data, actions) => {
                    const pedido = await actions.order.capture();
                    //confirmarPago();
                    setMetodoPago("PayPal")
                    enviarHandler();
                    console.log(pedido);
                },
                onError: (err) => {
                    console.error(err);
                },
            })
            .render(paypalRef.current);
    }, []);

    // Pago hecho
    /*if (pagado) {
        enviarHandler();
    }

    // Fallo
    if (error) {
        return <div>¡Error ocurrido durante la transacción! Por favor, inténtelo de nuevo.</div>;
    }*/

    return (
        <div>
            <CheckoutPasos paso1 paso2 paso3></CheckoutPasos>
            <div className="text-center container-sm"> {/*onSubmit={submitHandler}>*/}
                <h1 className="text-center tituloPagina">Pago</h1>
                <form className="formRegistro">
                    {(error) && <div>¡Error ocurrido durante la transacción! Por favor, inténtelo de nuevo.</div>}
                    <div ref={paypalRef} />


                    {/*<input type="radio" name="metodoPago" id="metodoPago" value="PayPal" checked onChange={(e) => setMetodoPago(e.target.value)}></input>
                    <label htmlFor="metodoPago">PayPal</label>

                    <button className="btn btn-lg btn-primary btn-block" type="submit">Continuar</button>*/}
                </form>
            </div>
        </div>
    );
}

export default PagoScreen;