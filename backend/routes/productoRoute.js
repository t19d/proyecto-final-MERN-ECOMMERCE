import express from 'express';
import Producto from '../models/productoModelo';
import { isAdmin, isAuth } from '../util';

const router = express.Router();

router.get("/", async (req, res) => {
    const productos = await Producto.find({});
    res.send(productos);
});

{/*TODO: isAuth e isAdmin son para que solo los administradores logeados puedan hacer las acciones de creación, edición y eliminación*/ }

router.post("/", isAdmin, isAuth, async (req, res) => {
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

router.put("/:id", isAdmin, isAuth, async (req, res) => {
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
        producto.cantidadStokXS = req.body.cantidadStokXS;
        producto.cantidadStokS = req.body.cantidadStokS;
        producto.cantidadStokM = req.body.cantidadStokM;
        producto.cantidadStokL = req.body.cantidadStokL;
        producto.cantidadStokXL = req.body.cantidadStokXL;

        const updatedProducto = await producto.save();
        if (updatedProducto) {
            return res.status(200).send({ msg: 'Producto actualizando.', data: updatedProducto });
        }
    }
    return res.status(500).send({ msg: 'Error actualizando producto.' });
});



router.delete("/:id", isAdmin, isAuth, async (req, res) => {
    const deletedProducto = await Producto.findById(req.params.id);
    if (deletedProducto) {
        await deletedProducto.remove();
        res.send({ msg: 'Producto eliminado.' });
    } else {
        res.send({ msg: 'Error eliminando producto.' });
    }
});

export default router