'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DetalleOrdenVta extends Model {
    
    static associate(models) {
      DetalleOrdenVta.belongsTo(models.OrdenVenta, { foreignKey: 'NroOrdenVta' });
      DetalleOrdenVta.belongsTo(models.Medicamento, { foreignKey: 'CodMedicamento' });
    }
  }
  DetalleOrdenVta.init({
    descripcionMed: DataTypes.STRING,
    cantidadRequerida: DataTypes.INTEGER,
    NroOrdenVta: DataTypes.INTEGER,
    CodMedicamento: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'DetalleOrdenVta',
  });
  return DetalleOrdenVta;
};