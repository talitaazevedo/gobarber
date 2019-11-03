// conexão com banco dde dados e importação de models
import Sequelize from 'sequelize';
import mongoose from 'mongoose';
// Importando os Models
import User from '../app/models/User';
import File from '../app/models/File';
import Appointment from '../app/models/Appointment';

// Importando o arquivo de configuração
import databaseConfig from '../config/database';

// colocar os models em um array
const models = [User, File, Appointment];

class Database {
    constructor() {
        // variavel instanciando o metodo init
        this.init();
        this.mongo();
    }

    init() {
        // Essa variavel recebe  como parametro do sequelize o database que foi importado
        this.connection = new Sequelize(databaseConfig);
        // percorrer o array e para cada model executar o metodo init com a connection
        models
            .map(model => model.init(this.connection))
            .map(
                model =>
                    model.associate && model.associate(this.connection.models)
            );
    }

    mongo() {
        this.mongoConnection = mongoose.connect(
            'mongodb://localhost:27017/gobarber',
            {
                useNewUrlParser: true,
                useFindAndModify: true,
                useUnifiedTopology: true,
            }
        );
    }
}

export default new Database();
