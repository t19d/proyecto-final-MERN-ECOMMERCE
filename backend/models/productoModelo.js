import mongoose from 'mongoose';

const productoSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    miniatura: { type: String, required: true},
    imgDescripcion: { type: String, required: true },
    precio: { type: Number, required: true},
    precioOferta: { type: Number, required: true},
    descripcion: { type: String, required: true},
    imagenes: { type: Array, required: true},
    categorias: { type: Array, required: true},
    cantidadStockXS: { type: Number, required: true},
    cantidadStockS: { type: Number, required: true},
    cantidadStockM: { type: Number, required: true},
    cantidadStockL: { type: Number, required: true},
    cantidadStockXL: { type: Number, required: true},
});

const productoModelo = mongoose.model("Producto", productoSchema);

export default productoModelo;