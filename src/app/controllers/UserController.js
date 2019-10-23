import * as Yup from 'yup';
import User from '../models/User';

class UserController {
    // metodo de criação
    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string()
                .email()
                .required(),
            password: Yup.string()
                .required()
                .min(6),
        });
        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Invalid validation' });
        }
        // Pesquisa dentro do req.body se o e-mail do cara já existe cadastrado
        const userExists = await User.findOne({
            where: { email: req.body.email },
        });
        if (userExists) {
            // Retorna mensagem de erro caso o usuário exista
            return res.status(400).json({ error: 'User already exists.' });
        }
        const { id, name, email, provider } = await User.create(req.body);

        // var recebe o metodo create do model que está sendo importado
        // const user = await User.create(req.body);
        // retorna o resultado da requisição
        return res.json({
            id,
            name,
            email,
            provider,
        });
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string().email(),
            oldPassword: Yup.string().min(6),
            password: Yup.string()
                .min(6)
                .when('oldPassword', (oldPassword, field) =>
                    oldPassword ? field.required() : field
                ),
            confirmPassword: Yup.string().when('password', (password, field) =>
                password ? field.required().oneOf([Yup.ref('password')]) : field
            ),
        });
        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Invalid Validation' });
        }

        // desestruturação pega email e password do corpo da requisição
        const { email, oldPassword } = req.body;
        // recebe o user id
        const user = await User.findByPk(req.userId);

        if (email !== user.email) {
            // Vai procurar o e-mail
            const userExists = await User.findOne({ where: { email } });
            if (userExists) {
                // Se o e-mail não existir
                return res.status(400).json({ error: ' User already exists' });
            }
        }
        // Compara a senha antiga com a senha atual
        if (oldPassword && !(await user.checkPassword(oldPassword))) {
            return res.status(401).json({ error: 'Password does not Match' });
        }
        // faz o update após validação
        const { id, name, provider } = await user.update(req.body);
        // retorna os dados no objeto json
        return res.json({
            id,
            name,
            email,
            provider,
        });
    }
}
// exporta a classe =>
export default new UserController();
