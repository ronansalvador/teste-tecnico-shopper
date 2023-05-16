'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('products', {
      code: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      cost_price: {
        allowNull: false,
        type: Sequelize.DECIMAL(9, 2),
      },
      sales_price: {
        allowNull: false,
        type: Sequelize.DECIMAL(9, 2),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('products');
  },
};
