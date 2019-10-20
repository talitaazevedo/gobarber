import { Router } from 'express';

import User from './app/models/User';

const routes = new Router();

routes.get('/', async (req, res) => {
    const user = await User.create({
        name: 'Talita Azevedo',
        email: 'talita.azevedo360@gmail.com',
        password_hash: '12345646546',
        provider: false,
    });
    return res.json(user);
});

export default routes;
