'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrdenVenta extends Model {
    
    static associate(models) {
      OrdenVenta.hasMany(models.DetalleOrdenVta, { foreignKey: 'NroOrdenVta' });
    }
  }
  OrdenVenta.init({
    fechaEmision: DataTypes.DATE,
    Motivo: DataTypes.STRING,
    Situacion: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'OrdenVenta',
  });
  return OrdenVenta;
};