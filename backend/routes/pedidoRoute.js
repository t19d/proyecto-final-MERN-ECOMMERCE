import express from 'express';
import Pedido from '../models/pedidoModelo';
import { isAdmin, isAuth } from '../util';

const router = express.Router();

router.get("/", isAuth, isAdmin, async (req, res) => {
    try {
        const pedidos = await Pedido.find({});
        res.send(pedidos);
    } catch (error) {
        res.status(500).send({ message: 'No se ha podido conectar con la base de datos' });
    }
});

router.get('/usuario', isAuth, async (req, res) => {
    try {
        const pedidos = await Pedido.find({ usuario: req.usuario._id });
        res.send(pedidos);
    } catch (error) {
        res.status(500).send({ message: 'No se ha podido conectar con la base de datos' });
    }
});

router.post('/', isAuth, async (req, res) => {
    try {
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
                res.status(201).send({ message: 'Nuevo pedido creado.', data: newPedido });
            }
        }
    } catch (error) {
        res.status(500).send({ message: 'No se ha podido conectar con la base de datos' });
    }
});

router.get('/:id', isAuth, async (req, res) => {
    try {
        // Por seguridad, implementar la búsqueda al usuario activo
        //const pedidos = await Pedido.find({ usuario: req.usuario._id });
        const pedido = await Pedido.findById(req.params.id);
        if (pedido) {
            res.send(pedido);
        } else {
            res.status(404).send({ message: 'Pedido no encontrado' });
        }
    } catch (error) {
        res.status(500).send({ message: 'No se ha podido conectar con la base de datos' });
    }
});

/* Posible implementación de confirmar pago, eliminar pedido y poner fecha de envío */
/*router.put(
    '/:id/pay',
    isAuth,
    expressAsyncHandler(async (req, res) => {
        const pedido = await pedido.findById(req.params.id);
        if (pedido) {
            pedido.isPaid = true;
            pedido.paidAt = Date.now();
            pedido.paymentResult = {
                id: req.body.id,
                status: req.body.status,
                update_time: req.body.update_time,
                email_address: req.body.email_address,
            };
            const updatedpedido = await pedido.save();
            res.send({ message: 'pedido Paid', pedido: updatedpedido });
        } else {
            res.status(404).send({ message: 'pedido Not Found' });
        }
    })
);

router.delete(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        const pedido = await pedido.findById(req.params.id);
        if (pedido) {
            const deletepedido = await pedido.remove();
            res.send({ message: 'pedido Deleted', pedido: deletepedido });
        } else {
            res.status(404).send({ message: 'pedido Not Found' });
        }
    })
);

router.put(
    '/:id/deliver',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        const pedido = await pedido.findById(req.params.id);
        if (pedido) {
            pedido.isDelivered = true;
            pedido.deliveredAt = Date.now();

            const updatedpedido = await pedido.save();
            res.send({ message: 'pedido Delivered', pedido: updatedpedido });
        } else {
            res.status(404).send({ message: 'pedido Not Found' });
        }
    })
);*/

export default router