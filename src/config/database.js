// Conffiguração do sequelize

module.exports = {
    // dialect é o tipo de banco que vou usar
    dialect: 'postgres',
    host: 'localhost',

    username: 'postgres',
    password: 'docker',
    // nome do banco
    database: 'gobarberdb',
    define: {
        // padrão de projeto comum
        timestamps: true,
        // coloca underline nos nomes de tabelas
        underscored: true,
        // colloca underline no restante
        underscoredAll: true,
    },
};
