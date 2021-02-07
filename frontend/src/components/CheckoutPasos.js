import React from "react";

function CheckoutPasos(props) {
    return <div className="checkoutPasos container">
        <div className={props.paso1 ? 'active' : ''}>Iniciar sesión</div>
        <div className={props.paso2 ? 'active' : ''}>Envío</div>
        <div className={props.paso3 ? 'active' : ''}>Pago</div>
        <div className={props.paso4 ? 'active' : ''}>Finalizar pedido</div>
    </div>
}

export default CheckoutPasos;