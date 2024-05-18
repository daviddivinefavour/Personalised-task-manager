'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable(
        'users',
        {
          id: {
            allowNull: false,
            primaryKey: true,
            autoIncrement: false,
            type: Sequelize.UUID,
          },
          firstName: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'first_name',
          },
          lastName: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'last_name',
          },
          email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
          },
          verifiedAt: {
            allowNull: true,
            type: Sequelize.DATE,
            field: 'verified_at',
          },
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
            field: 'created_at',
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
            field: 'updated_at',
          },
          deletedAt: {
            allowNull: true,
            type: Sequelize.DATE,
            field: 'deleted_at',
          },
        },
        { transaction },
      );
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.dropTable('users', transaction);
    });
  },
};
