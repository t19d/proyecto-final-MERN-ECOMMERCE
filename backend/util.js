import config from './config';
import jwt from 'jsonwebtoken';

const getToken = (usuario) => {
    return jwt.sign({
        _id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
        isAdmin: usuario.isAdmin
    }, config.JWT_SECRET, {
        expiresIn: 30 * 24 * 60 * 60 // '30d'
    });
}

const isAuth = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (authorization) {
        const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
        jwt.verify(token, config.JWT_SECRET, (error, decode) => {
            if (error) {
                res.status(401).send({ message: 'Token inválido.' });
            } else {
                req.usuario = decode;
                next();
            }
        });
    } else {
        res.status.send({ message: 'No se ha proporcionado el token.' });
    }
}

const isAdmin = (req, res, next) => {
    if (req.usuario && req.usuario.isAdmin) {
        next();
    } else {
        res.status(401).send({ message: 'Admin token no es válido' });
    }
}

export { getToken, isAuth, isAdmin }