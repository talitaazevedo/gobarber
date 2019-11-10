// Conffiguração do sequelize
require('dotenv/config');

module.exports = {
    // dialect é o tipo de banco que vou usar
    dialect: 'postgres',
    host: process.env.DB_HOST,

    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    // nome do banco
    database: process.env.DB_NAME,
    define: {
        // padrão de projeto comum
        timestamps: true,
        // coloca underline nos nomes de tabelas
        underscored: true,
        // colloca underline no restante
        underscoredAll: true,
    },
};
