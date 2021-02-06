import mongoose from 'mongoose';

const productoSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    miniatura: { type: String, required: true},
    imgDescripcion: { type: String, required: true },
    precio: { type: Number, required: true},
    descripcion: { type: String, required: true},
    imagenes: { type: Array, required: true},
    categorias: { type: Array, required: true},
    cantidadStokXS: { type: Number, required: true},
    cantidadStokS: { type: Number, required: true},
    cantidadStokM: { type: Number, required: true},
    cantidadStokL: { type: Number, required: true},
    cantidadStokXL: { type: Number, required: true},
});

const productoModelo = mongoose.model("Producto", productoSchema);

export default productoModelo;