import argon2 from 'argon2';
import { query } from '../db.js';

export const Admin = {

    async findByEmail(email) {
        const [row] = await query('SELECT * FROM admin WHERE email = ?', [email]);
        return row ?? null;
    },

    verifyPassword(hash, password) {
        return argon2.verify(hash, password);
    },
};