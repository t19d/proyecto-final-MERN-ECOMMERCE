import express from 'express';
import data from './data.js';

const app = express();
const port = 4000;

{/* API todos los productos */ }
app.get("/api/productos", (req, res) => {
    res.send(data.productos);
});

{/* API detalle producto */ }
app.get("/api/productos/:id", (req, res) => {
    const productoId = req.params.id;
    const producto = data.productos.find(x=>x._id === productoId);
    if (producto) {
        res.send(producto);
    } else {
        res.status(404).send({ msg: "Producto no encontrado." });
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});