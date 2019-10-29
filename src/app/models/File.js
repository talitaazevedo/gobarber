import Sequelize, { Model } from 'sequelize';

class File extends Model {
    static init(sequelize) {
        // Chama metodo da classe pai  MODEL
        super.init(
            {
                // colunas que serão inserisdas pelo usuario

                // primeiro parametro
                name: Sequelize.STRING,
                path: Sequelize.STRING,
            },
            {
                // segundo parametro
                sequelize,
            }
        );
        return this;
    }
}

// Exportando a classe

export default File;
