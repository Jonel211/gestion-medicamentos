'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DetalleOrdenCompras', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      descripcion: {
        type: Sequelize.STRING
      },
      cantidad: {
        type: Sequelize.INTEGER
      },
      precio: {
        type: Sequelize.FLOAT
      },
      montouni: {
        type: Sequelize.FLOAT
      },
      NroOrdenC: {
        type: Sequelize.INTEGER,
        references: {
          model: 'ordencompras',
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
    await queryInterface.dropTable('DetalleOrdenCompras');
  }
};