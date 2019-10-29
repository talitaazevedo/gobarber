module.exports = {
    up: (queryInterface, Sequelize) => {
        /*
      Este field adciona relacionamento na tabela
      criar uma nova migration
      yarn sequelize migration:create --name=add-field-to-users

    */
        return queryInterface.addColumn('users', 'avatar_id', {
            type: Sequelize.INTEGER,
            // chave estrangeira
            references: { model: 'files', key: 'id' },
            // CASCADE Também atualiza na tabela em caso de update
            onUpdate: 'CASCADE',
            // o que vai acontecer se este ID for deletado da tabela
            onDelete: 'SET NULL',
            allowNull: true,
        });
    },

    down: queryInterface => {
        return queryInterface.removeColumn('users', 'avatar_id');
    },
};
