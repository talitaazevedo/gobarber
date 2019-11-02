// Model de agendamento

import Sequelize, { Model } from 'sequelize';

class Appointment extends Model {
    static init(sequelize) {
        // Chama metodo da classe pai  MODEL
        super.init(
            {
                // colunas que serão inseridas pelo usuario

                // primeiro parametro
                date: Sequelize.STRING,
                canceled_at: Sequelize.STRING,
            },
            {
                // segundo parametro
                sequelize,
            }
        );
        return this;
    }

    // Metodo que faz o relacionamento com outras tabelas do banco
    static associate(models) {
        this.belongsTo(models.User, {
            foreignKey: 'user_id',
            // Apelido
            as: 'user',
        });
        this.belongsTo(models.User, {
            foreignKey: 'provider_id',
            // apelido
            as: 'provider',
        });
    }
}

// Exportando a classe

export default Appointment;
