// TRabalhando com sessions e autenticação de usuário
// Metodologia JWT
import jwt from 'jsonwebtoken';

import User from '../models/User';
import authConfig from '../../config/auth';

class SessionController {
    async store(req, res) {
        // desconstrução busca o objeto de email senha
        const { email, password } = req.body;
        // pesquisa o e-mail
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ error: 'User Not Found' });
        }
        // Se o password estiver errado retorna erro
        if (!(await user.checkPassword(password))) {
            return res
                .status(401)
                .json({ error: 'Bad Password | Password does not match' });
        }
        // recebe o id e o nome de usuario
        const { id, name } = user;
        // retorna os objetos dentro da variavel como resposta
        return res.json({
            user: {
                id,
                name,
                email,
            },
            // aqui usamos j jwt  usamos o https://www.md5online.org/ => gerar encriptação
            // este token é unico

            token: jwt.sign({ id }, authConfig.secret, {
                expiresIn: authConfig.expiresIn,
            }),
        });
    }
}

export default new SessionController();
