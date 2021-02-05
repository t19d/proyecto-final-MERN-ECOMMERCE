import { config } from 'dotenv/types';
import jwt from 'jsonwebtoken';

const getToken = (usuario) => {
    return jwt.sign(usuario, config.JWT_SECRET, {
        expiresIn: '48h'
    });
}

export { getToken }