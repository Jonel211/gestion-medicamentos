'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Especialidad extends Model {

    static associate(models) {
      Especialidad.hasMany(models.Medicamento, { foreignKey: 'CodEspec' });
    }
  }
  Especialidad.init({
    descripcionEsp: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Especialidad',
  });
  return Especialidad;
};