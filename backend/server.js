import express from 'express';
import data from '.data.js';

const app = express();
const port = 50000;

app.get("/api/productos", (req, res)=>{
    res.send(data.productos);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});