import express from 'express';
import Usuario from '../models/usuarioModelo'
import { getToken } from '../util';

const router = express.Router();

router.post('/iniciosesion', async (req, res) => {
    {/* Obtener usuario */ }
    const signinUsuario = await Usuario.findOne({
        email: req.body.email,
        password: req.body.password
    });
    if (signinUsuario) {
        res.send({
            _id: signinUsuario.id,
            nombre: signinUsuario.nombre,
            email: signinUsuario.email,
            isAdmin: signinUsuario.isAdmin,
            token: getToken(signinUsuario)
        });
    } else {
        res.status(401).send({msg: 'El email o la contraseña no coinciden.'});
    }
});

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