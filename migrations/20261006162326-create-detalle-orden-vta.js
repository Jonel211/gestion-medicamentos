'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DetalleOrdenVta', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      descripcionMed: {
        type: Sequelize.STRING
      },
      cantidadRequerida: {
        type: Sequelize.INTEGER
      },
      NroOrdenVta: {
        type: Sequelize.INTEGER,
        references: {
          model: 'ordenventa', // Asegúrate que este nombre coincida con la tabla que crea Sequelize
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      CodMedicamento: {
        type: Sequelize.INTEGER,
        references: {
          model: 'medicamentos',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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
    await queryInterface.dropTable('DetalleOrdenVta');
  }
};