import User from '../models/User';

class UserController {
    // metodo de criação
    async store(req, res) {
        // Pesquisa dentro do req.body se o e-mail do cara já existe cadastrado
        const userExists = await User.findOne({
            where: { email: req.body.email },
        });
        if (userExists) {
            // Retorna mensagem de erro caso o usuário exista
            return res.status(400).json({ error: 'User already exists.' });
        }
        const { id, name, email, provider, password_hash } = await User.create(
            req.body
        );

        // var recebe o metodo create do model que está sendo importado
        // const user = await User.create(req.body);
        // retorna o resultado da requisição
        return res.json({
            id,
            name,
            email,
            provider,
            password_hash,
        });
    }
}
// exporta a classe =>
export default new UserController();
