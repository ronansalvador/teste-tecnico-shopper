'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('packs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      pack_id: {
        allowNull: false,
        type: Sequelize.BIGINT,
        references: {
          model: 'products',
          key: 'code',
        },
      },
      product_id: {
        allowNull: false,
        type: Sequelize.BIGINT,
        references: {
          model: 'products',
          key: 'code',
        },
      },
      qty: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('packs');
  },
};
