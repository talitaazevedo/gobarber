// Model de agendamento

import Sequelize, { Model } from 'sequelize';
import { isBefore, subHours } from 'date-fns';

class Appointment extends Model {
    static init(sequelize) {
        // Chama metodo da classe pai  MODEL
        super.init(
            {
                // colunas que serão inseridas pelo usuario

                // primeiro parametro
                date: Sequelize.STRING,
                canceled_at: Sequelize.DATE,
                past: {
                    type: Sequelize.VIRTUAL,
                    get() {
                        return isBefore(this.date, new Date());
                    },
                },
                cancelable: {
                    type: Sequelize.VIRTUAL,
                    get() {
                        return isBefore(new Date(), subHours(this.date, 2));
                    },
                },
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
