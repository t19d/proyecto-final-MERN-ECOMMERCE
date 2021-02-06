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

const isAuth = (req, rest, next) => {
    const token = req.headers.authorization;
    if (token) {
        const onlyToken = token.slice(7, token.length);
        jwt.verify(onlyToken, config.JWT_SECRET, (error, decode) => {
            if (error) {
                return rest.status(401).send({ msg: 'Token inválido.' });
            } else {
                req.usuario = token;
                next();
                return
            }
        });
    }
    return rest.status.send({ msg: 'No se ha proporcionado el token.' });
}

const isAdmin = (req, rest, next) => {
    if (req.user && req.user.isAdmin) {
        return next();
    } else {
        return rest.status(401).send({ msg: 'Admin token no es válido' });
    }
}

export { getToken, isAuth, isAdmin }