'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('OrdenCompras', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fechaEmision: {
        type: Sequelize.DATE
      },
      Situacion: {
        type: Sequelize.STRING
      },
      Total: {
        type: Sequelize.FLOAT
      },
      NrofacturaProv: {
        type: Sequelize.STRING
      },
      CodLab: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Laboratorios', // nombre de la tabla en plural
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('OrdenCompras');
  }
};