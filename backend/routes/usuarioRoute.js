import express from 'express';
import Usuario from '../models/usuarioModelo'
import { getToken, isAuth, isAdmin } from '../util';

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
        res.status(401).send({ message: 'El email o la contraseña no coinciden.' });
    }
});

router.post('/registro', async (req, res) => {
    const usuario = new Usuario({
        nombre: req.body.nombre,
        email: req.body.email,
        password: req.body.password
    });
    const newUsuario = await usuario.save();
    if (newUsuario) {
        res.send({
            _id: newUsuario.id,
            nombre: newUsuario.nombre,
            email: newUsuario.email,
            isAdmin: newUsuario.isAdmin,
            token: getToken(newUsuario)
        });
    } else {
        res.status(401).send({ message: 'Datos de usuario no válidos.' });
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
        res.send({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    const usuario = await Usuario.findById(req.params.id);
    if (usuario) {
        res.send(usuario);
    } else {
        res.status(404).send({ message: 'Usuario no encontrado' });
    }
});

router.put('/perfil', isAuth, async (req, res) => {
    const usuario = await Usuario.findById(req.usuario._id);
    if (usuario) {
        // Recoger valores del documento y si no existen, de la bbdd
        usuario.nombre = req.body.nombre || usuario.nombre;
        usuario.email = req.body.email || usuario.email;
        if (req.body.password) {
            // TODO: Encriptar contraseña si la actualizo
            usuario.password = req.body.password;
        }
        const updatedUsuario = await usuario.save();
        res.send({
            _id: updatedUsuario._id,
            nombre: updatedUsuario.nombre,
            email: updatedUsuario.email,
            isAdmin: updatedUsuario.isAdmin,
            token: getToken(updatedUsuario),
        });
    } else {
        res.status(404).send({ message: 'Usuario no encontrado' });
    }
});

router.put('/:id', isAuth, async (req, res) => {
    const usuario = await Usuario.findById(req.usuario._id);
    if (usuario) {
        // Recoger valores del documento y si no existen, de la bbdd
        usuario.nombre = req.body.nombre || usuario.nombre;
        usuario.email = req.body.email || usuario.email;
        if (req.body.password) {
            // TODO: Encriptar contraseña si la actualizo
            usuario.password = req.body.password;
        }
        usuario.isAdmin = Boolean(req.body.isAdmin);
        const updatedUsuario = await usuario.save();
        res.send({ message: 'Usuario actualizado', usuario: updatedUsuario });
    } else {
        res.status(404).send({ message: 'Usuario no encontrado' });
    }
});

router.get('/', isAuth, isAdmin, async (req, res) => {
    const usuarios = await Usuario.find({});
    res.send(usuarios);
});


export default router