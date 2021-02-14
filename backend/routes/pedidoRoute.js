import express from 'express';
import Pedido from '../models/pedidoModelo';
import { isAdmin, isAuth } from '../util';

const router = express.Router();

router.get("/", isAuth, isAdmin, async (req, res) => {
    const pedidos = await Pedido.find({});
    res.send(pedidos);
});

router.get('/usuario', isAuth, async (req, res) => {
    const pedidos = await Pedido.find({ usuario: req.usuario._id });
    res.send(pedidos);
});

router.post('/', isAuth, async (req, res) => {
    if (req.body.pedidoItems.length === 0) {
        res.status(400).send({ message: 'Carrito vacío' });
    } else {
        const pedido = new Pedido({
            pedidoItems: req.body.pedidoItems,
            direccion: req.body.direccion,
            metodoPago: req.body.metodoPago,
            subtotal: req.body.subtotal,
            gastosEnvio: req.body.gastosEnvio,
            total: req.body.total,
            usuario: req.usuario._id,
            pagadoDia: req.body.pagadoDia,
            llegadaEnvioDia: req.body.llegadaEnvioDia
        });
        const newPedido = await pedido.save();
        if (newPedido) {
            return res.status(201).send({ message: 'Nuevo pedido creado.', data: newPedido });
        }
    }
});

router.get('/:id', isAuth, async (req, res) => {
    // Por seguridad, implementar la búsqueda al usuario activo
    //const pedidos = await Pedido.find({ usuario: req.usuario._id });
    const pedido = await Pedido.findById(req.params.id);
    if (pedido) {
        res.send(pedido);
    } else {
        res.status(404).send({ message: 'Pedido no encontrado' });
    }
});

/* Posible implementación de confirmar pago, eliminar pedido y poner fecha de envío */
/*router.put(
    '/:id/pay',
    isAuth,
    expressAsyncHandler(async (req, res) => {
        const order = await Order.findById(req.params.id);
        if (order) {
            order.isPaid = true;
            order.paidAt = Date.now();
            order.paymentResult = {
                id: req.body.id,
                status: req.body.status,
                update_time: req.body.update_time,
                email_address: req.body.email_address,
            };
            const updatedOrder = await order.save();
            res.send({ message: 'Order Paid', order: updatedOrder });
        } else {
            res.status(404).send({ message: 'Order Not Found' });
        }
    })
);

router.delete(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        const order = await Order.findById(req.params.id);
        if (order) {
            const deleteOrder = await order.remove();
            res.send({ message: 'Order Deleted', order: deleteOrder });
        } else {
            res.status(404).send({ message: 'Order Not Found' });
        }
    })
);

router.put(
    '/:id/deliver',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        const order = await Order.findById(req.params.id);
        if (order) {
            order.isDelivered = true;
            order.deliveredAt = Date.now();

            const updatedOrder = await order.save();
            res.send({ message: 'Order Delivered', order: updatedOrder });
        } else {
            res.status(404).send({ message: 'Order Not Found' });
        }
    })
);*/

export default router