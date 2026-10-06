'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrdenCompra extends Model {
    
    static associate(models) {
      OrdenCompra.belongsTo(models.Laboratorio, { foreignKey: 'CodLab' });
      OrdenCompra.hasMany(models.DetalleOrdenCompra, { foreignKey: 'NroOrdenC' });
    }
  }
  OrdenCompra.init({
    fechaEmision: DataTypes.DATE,
    Situacion: DataTypes.STRING,
    Total: DataTypes.FLOAT,
    NrofacturaProv: DataTypes.STRING,
    CodLab: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'OrdenCompra',
  });
  return OrdenCompra;
};