'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable(
        'authentications',
        {
          id: {
            allowNull: false,
            primaryKey: true,
            autoIncrement: false,
            type: Sequelize.UUID,
          },
          password: {
            allowNull: false,
            type: Sequelize.STRING,
          },
          lastSeen: {
            allowNull: true,
            type: Sequelize.DATE,
            field: 'last_seen',
          },
          userId: {
            allowNull: false,
            type: Sequelize.UUID,
            field: 'user_id',
            references: {
              model: 'users',
              key: 'id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
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
      await queryInterface.dropTable('authentications', transaction);
    });
  },
};
