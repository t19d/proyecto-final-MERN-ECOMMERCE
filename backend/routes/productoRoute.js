import express from 'express';
import Producto from '../models/productoModelo';
import { isAdmin, isAuth } from '../util';

const router = express.Router();

router.get("/", async (req, res) => {
    const productos = await Producto.find({});
    res.send(productos);
});

router.get("/:id", async (req, res) => {
    const producto = await Producto.findOne({ _id: req.params.id })
    if (producto) {
        res.send(producto);
    } else {
        res.status(404).send({ message: 'Producto no encontrado' });
    }
});

{/*TODO: isAuth e isAdmin son para que solo los administradores logeados puedan hacer las acciones de creación, edición y eliminación*/ }

router.post("/", isAuth, isAdmin, async (req, res) => {
    const producto = new Producto({
        nombre: req.body.nombre,
        miniatura: req.body.miniatura,
        precio: req.body.precio,
        imgDescripcion: req.body.imgDescripcion,
        descripcion: req.body.descripcion,
        imagenes: req.body.imagenes,
        categorias: req.body.categorias,
        cantidadStockXS: req.body.cantidadStockXS,
        cantidadStockS: req.body.cantidadStockS,
        cantidadStockM: req.body.cantidadStockM,
        cantidadStockL: req.body.cantidadStockL,
        cantidadStockXL: req.body.cantidadStockXL,
    });
    const newProducto = await producto.save();
    if (newProducto) {
        return res.status(201).send({ msg: 'Nuevo producto creado.', data: newProducto });
    } else {
        return res.status(500).send({ msg: 'Error creando producto.' });
    }
});

router.put("/:id", isAuth, isAdmin, async (req, res) => {
    const productoId = req.params.id;
    const producto = await Producto.findOne({ _id: productoId });
    if (producto) {
        producto.nombre = req.body.nombre;
        producto.miniatura = req.body.miniatura;
        producto.precio = req.body.precio;
        producto.imgDescripcion = req.body.imgDescripcion;
        producto.descripcion = req.body.descripcion;
        producto.imagenes = req.body.imagenes;
        producto.categorias = req.body.categorias;
        producto.cantidadStockXS = req.body.cantidadStockXS;
        producto.cantidadStockS = req.body.cantidadStockS;
        producto.cantidadStockM = req.body.cantidadStockM;
        producto.cantidadStockL = req.body.cantidadStockL;
        producto.cantidadStockXL = req.body.cantidadStockXL;

        const updatedProducto = await producto.save();
        if (updatedProducto) {
            return res.status(200).send({ msg: 'Producto actualizando.', data: updatedProducto });
        }
    }
    return res.status(500).send({ msg: 'Error actualizando producto.' });
});



router.delete("/:id", isAuth, isAdmin, async (req, res) => {
    const deletedProducto = await Producto.findById(req.params.id);
    if (deletedProducto) {
        await deletedProducto.remove();
        res.send({ msg: 'Producto eliminado.' });
    } else {
        res.send({ msg: 'Error eliminando producto.' });
    }
});

export default router