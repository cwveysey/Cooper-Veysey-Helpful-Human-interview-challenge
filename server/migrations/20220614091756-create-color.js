'use strict';

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
      .then(() => {
    queryInterface.createTable('colors', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()')
      },
      html_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      hex_code: {
        type: Sequelize.STRING,
        allowNull: false
      },
      group: { // See https://www.w3schools.com/colors/colors_groups.asp for color group definitions
        type: Sequelize.STRING,
        allowNull: false
      },
      rgb_string: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      }
    });
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('colors');
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
