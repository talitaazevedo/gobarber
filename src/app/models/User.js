// Model de criação de usuário
import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
    static init(sequelize) {
        // Chama metodo da classe pai  MODEL
        super.init(
            {
                // colunas que serão inserisdas pelo usuario

                // primeiro parametro
                name: Sequelize.STRING,
                email: Sequelize.STRING,
                // este campo não exist na base de dados
                password: Sequelize.VIRTUAL,
                password_hash: Sequelize.STRING,
                provider: Sequelize.BOOLEAN,
            },
            {
                // segundo parametro
                sequelize,
            }
        );
        // propriedade do sequelize
        this.addHook('beforeSave', async user => {
            if (user.password) {
                // retorna o hash de senha preenchido automaticamente
                user.password_hash = await bcrypt.hash(user.password, 8);
            }
        });
        return this;
    }

    // este metodo faz a associação de models user e files
    static associate(models) {
        // está linha relaciona as tabelas
        this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });
    }

    checkPassword(password) {
        return bcrypt.compare(password, this.password_hash);
    }
}

// Exportando a classe

export default User;
