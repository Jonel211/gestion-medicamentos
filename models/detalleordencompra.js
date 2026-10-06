'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DetalleOrdenCompra extends Model {
    
    static associate(models) {
      DetalleOrdenCompra.belongsTo(models.OrdenCompra, { foreignKey: 'NroOrdenC' });
      DetalleOrdenCompra.belongsTo(models.Medicamento, { foreignKey: 'CodMedicamento' });
    }
  }
  DetalleOrdenCompra.init({
    descripcion: DataTypes.STRING,
    cantidad: DataTypes.INTEGER,
    precio: DataTypes.FLOAT,
    montouni: DataTypes.FLOAT,
    NroOrdenC: DataTypes.INTEGER,
    CodMedicamento: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'DetalleOrdenCompra',
  });
  return DetalleOrdenCompra;
};