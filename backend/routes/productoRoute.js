import express from 'express';
import Producto from '../models/productoModelo'
import { getToken } from '../util';

const router = express.Router();

router.get("/", async (req, res) => {
    const productos = await Producto.find({});
    res.send(productos);
});

router.post("/", async (req, res) => {
    const producto = new Producto({
        nombre: req.body.nombre,
        miniatura: req.body.miniatura,
        precio: req.body.precio,
        imgDescripcion: req.body.imgDescripcion,
        descripcion: req.body.descripcion,
        imagenes: req.body.imagenes,
        categorias: req.body.categorias,
        cantidadStokXS: req.body.cantidadStokXS,
        cantidadStokS: req.body.cantidadStokS,
        cantidadStokM: req.body.cantidadStokM,
        cantidadStokL: req.body.cantidadStokL,
        cantidadStokXL: req.body.cantidadStokXL,
    });
    const newProducto = await producto.save();
    if (newProducto) {
        return res.status(201).send({ msg: 'Nuevo producto creado.', data: newProducto });
    } else {
        return res.status(500).send({ msg: 'Error creando producto.' });
    }
});

export default router