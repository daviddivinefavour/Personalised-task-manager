'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable(
        'tasks',
        {
          id: {
            allowNull: false,
            primaryKey: true,
            autoIncrement: false,
            type: Sequelize.UUID,
          },
          title: {
            allowNull: false,
            type: Sequelize.STRING,
          },
          description: {
            allowNull: true,
            type: Sequelize.TEXT,
          },
          status: {
            allowNull: false,
            type: Sequelize.ENUM('pending', 'in-progress', 'completed'),
            defaultValue: 'pending',
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
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
            field: 'updated_at',
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
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
      await queryInterface.dropTable('tasks', { transaction });
    });
  },
};
