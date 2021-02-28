import express from 'express';
import Producto from '../models/productoModelo';
import { isAdmin, isAuth } from '../util';

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const productos = await Producto.find({});
        res.send(productos);
    } catch (error) {
        res.status(500).send({ message: 'No se ha podido conectar con la base de datos' });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const producto = await Producto.findOne({ _id: req.params.id })
        if (producto) {
            res.send(producto);
        } else {
            res.status(404).send({ message: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).send({ message: 'No se ha podido conectar con la base de datos' });
    }
});

{/*TODO: isAuth e isAdmin son para que solo los administradores logeados puedan hacer las acciones de creación, edición y eliminación*/ }

router.post("/", isAuth, isAdmin, async (req, res) => {
    try {
        const producto = new Producto({
            nombre: req.body.nombre,
            miniatura: req.body.miniatura,
            precio: req.body.precio,
            precioOferta: req.body.precioOferta,
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
            res.status(201).send({ msg: 'Nuevo producto creado.', data: newProducto });
        } else {
            res.status(500).send({ msg: 'Error creando producto.' });
        }
    } catch (error) {
        res.status(500).send({ message: 'No se ha podido conectar con la base de datos' });
    }
});

// isAdmin eliminado para poder restar producto en crearPedido
router.put("/:id", isAuth, /*isAdmin,*/ async (req, res) => {
    try {
        const productoId = req.params.id;
        const producto = await Producto.findOne({ _id: productoId });
        if (producto) {
            // Comprobar si es administrador que va a cambiar datos del producto o 
            //      solo va a restar unidades vendidas
            if (isAdmin && !(req.body.talla)) {
                producto.nombre = req.body.nombre;
                producto.miniatura = req.body.miniatura;
                producto.precio = req.body.precio;
                producto.precioOferta = req.body.precioOferta;
                producto.imgDescripcion = req.body.imgDescripcion;
                producto.descripcion = req.body.descripcion;
                producto.imagenes = req.body.imagenes;
                producto.categorias = req.body.categorias;
                producto.cantidadStockXS = req.body.cantidadStockXS;
                producto.cantidadStockS = req.body.cantidadStockS;
                producto.cantidadStockM = req.body.cantidadStockM;
                producto.cantidadStockL = req.body.cantidadStockL;
                producto.cantidadStockXL = req.body.cantidadStockXL;
            } else {
                if (req.body.talla && req.body.cantidad) {
                    switch (req.body.talla) {
                        case "XS":
                            producto.cantidadStockXS = producto.cantidadStockXS - req.body.cantidad;
                            break;
                        case "S":
                            producto.cantidadStockS = producto.cantidadStockS - req.body.cantidad;
                            break;
                        case "M":
                            producto.cantidadStockM = producto.cantidadStockM - req.body.cantidad;
                            break;
                        case "L":
                            producto.cantidadStockL = producto.cantidadStockL - req.body.cantidad;
                            break;
                        case "XL":
                            producto.cantidadStockXL = producto.cantidadStockXL - req.body.cantidad;
                            break;
                        case "-":
                            producto.cantidadStockXS = producto.cantidadStockXS - req.body.cantidad;
                            break;
                        default:
                            producto.cantidadStockXS = producto.cantidadStockXS - req.body.cantidad;
                            break;
                    }
                }
            }

            const updatedProducto = await producto.save();
            if (updatedProducto) {
                res.status(200).send({ msg: 'Producto actualizando.', data: updatedProducto });
            }
        } else {
            res.status(500).send({ msg: 'Error actualizando producto.' });
        }
    } catch (error) {
        res.status(500).send({ message: 'No se ha podido conectar con la base de datos' });
    }
});



router.delete("/:id", isAuth, isAdmin, async (req, res) => {
    try {
        const deletedProducto = await Producto.findById(req.params.id);
        if (deletedProducto) {
            await deletedProducto.remove();
            res.send({ msg: 'Producto eliminado.' });
        } else {
            res.send({ msg: 'Error eliminando producto.' });
        }
    } catch (error) {
        res.status(500).send({ message: 'No se ha podido conectar con la base de datos' });
    }
});

export default router