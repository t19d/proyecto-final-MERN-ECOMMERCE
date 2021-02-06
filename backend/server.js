import express from 'express';
import data from './data';
import config from './config';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import usuarioRoute from './routes/usuarioRoute';
import productoRoute from './routes/productoRoute';

dotenv.config();

const mongodbUrl = config.MONGODB_URL;
mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).catch(err => console.log(err.reason));

const port = 4000;
const app = express();

app.use(bodyParser.json());

{/* Usuarios */ }
app.use("/api/usuarios", usuarioRoute);


{/* Productos */ }
app.use("/api/productos", productoRoute);

/*
// API todos los productos 
app.get("/api/productos", (req, res) => {
    res.send(data.productos);
});

// API detalle producto
app.get("/api/productos/:id", (req, res) => {
    const productoId = req.params.id;
    const producto = data.productos.find(x => x._id === productoId);
    if (producto) {
        res.send(producto);
    } else {
        res.status(404).send({ msg: "Producto no encontrado." });
    }
});*/

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});