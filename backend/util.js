import config from './config';
import jwt from 'jsonwebtoken';

const getToken = (usuario) => {
    return jwt.sign({
        _id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
        isAdmin: usuario.isAdmin
    }, config.JWT_SECRET, {
        expiresIn: '48h'
    });
}

export { getToken }