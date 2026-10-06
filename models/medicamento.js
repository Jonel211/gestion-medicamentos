'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Medicamento extends Model {
    
    static associate(models) {
      // Relaciones de pertenencia a Especialidad y TipoMedic
      Medicamento.belongsTo(models.TipoMedic, { foreignKey: 'CodTipoMed' });
      Medicamento.belongsTo(models.Especialidad, { foreignKey: 'CodEspec' });
      
      // Relaciones con los detalles
      Medicamento.hasMany(models.DetalleOrdenCompra, { foreignKey: 'CodMedicamento' });
      Medicamento.hasMany(models.DetalleOrdenVta, { foreignKey: 'CodMedicamento' });
    }
  }
  Medicamento.init({
    descripcionMed: DataTypes.STRING,
    fechaFabricacion: DataTypes.DATE,
    fechaVencimiento: DataTypes.DATE,
    Presentacion: DataTypes.STRING,
    stock: DataTypes.INTEGER,
    precioVentaUni: DataTypes.FLOAT,
    precioVentaPres: DataTypes.FLOAT,
    Marca: DataTypes.STRING,
    CodTipoMed: DataTypes.INTEGER,
    CodEspec: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Medicamento',
  });
  return Medicamento;
};