import mongoose from 'mongoose';

const pedidoSchema = new mongoose.Schema(
    {
        pedidoItems: [
            {
                nombre: { type: String, required: true },
                talla: { type: String, required: true },
                cantidad: { type: Number, required: true },
                miniatura: { type: String, required: true },
                precio: { type: Number, required: true },
                producto: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto', required: true, },
            },
        ],

        direccion: {
            nombre: { type: String, required: true },
            apellidos: { type: String, required: true },
            dni: { type: String, required: true },
            telefono: { type: String, required: true },
            direccion: { type: String, required: true },
            codigoPostal: { type: String, required: true },
            pais: { type: String, required: true },
            provincia: { type: String, required: true },
            email: { type: String, required: true },
        },

        metodoPago: { type: String, required: true },

        subtotal: { type: Number, required: true },
        gastosEnvio: { type: Number, required: true },
        total: { type: Number, required: true },
        
        usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
        pagadoDia: { type: Date },
        llegadaEnvioDia: { type: Date },
    },
);
const pedidoModelo = mongoose.model("Pedido", pedidoSchema);
export default pedidoModelo;