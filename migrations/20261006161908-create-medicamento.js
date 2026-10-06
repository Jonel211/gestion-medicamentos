'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Medicamentos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      descripcionMed: {
        type: Sequelize.STRING
      },
      fechaFabricacion: {
        type: Sequelize.DATE
      },
      fechaVencimiento: {
        type: Sequelize.DATE
      },
      Presentacion: {
        type: Sequelize.STRING
      },
      stock: {
        type: Sequelize.INTEGER
      },
      precioVentaUni: {
        type: Sequelize.FLOAT
      },
      precioVentaPres: {
        type: Sequelize.FLOAT
      },
      Marca: {
        type: Sequelize.STRING
      },
      CodTipoMed: {
        type: Sequelize.INTEGER,
        references: {
          model: 'tipomedics', // Nombre de la tabla a la que apunta
          key: 'id'            // Llave principal de la tabla destino
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      CodEspec: {
        type: Sequelize.INTEGER,
        references: {
          model: 'especialidads',
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
    await queryInterface.dropTable('Medicamentos');
  }
};