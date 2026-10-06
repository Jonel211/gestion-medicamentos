'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TipoMedic extends Model {

    static associate(models) {
      TipoMedic.hasMany(models.Medicamento, { foreignKey: 'CodTipoMed' });
    }
  }
  TipoMedic.init({
    descripcion: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'TipoMedic',
  });
  return TipoMedic;
};