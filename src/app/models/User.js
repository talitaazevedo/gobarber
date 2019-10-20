import Sequelize, { Model } from 'sequelize';

class User extends Model {
    static init(sequelize) {
        // Chama metodo da classe pai  MODEL
        super.init(
            {
                // colunas que serão inserisdas pelo usuario

                // primeiro parametro
                name: Sequelize.STRING,
                email: Sequelize.STRING,
                password_hash: Sequelize.STRING,
                provider: Sequelize.BOOLEAN,
            },
            {
                // segundo parametro
                sequelize,
            }
        );
    }
}

// Exportando a classe

export default User;
