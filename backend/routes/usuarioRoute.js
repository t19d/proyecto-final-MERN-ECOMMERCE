import express from 'express';
import Usuario from '../models/usuarioModelo'

const router = express.Router();

router.get("/crearadmin", async (req, res) => {
    try {
        const usuario = new Usuario({
            nombre: 'David',
            email: 'davidtojo99@gmail.com',
            password: 'abc123.',
            isAdmin: true
        });

        const newUsuario = await usuario.save();
        res.send(newUsuario);
    } catch (error) {
        res.send({ msg: error.message });
    }
})

export default router