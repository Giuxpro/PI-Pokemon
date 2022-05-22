const { DataTypes, UUIDV4, DATE } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('type', {
    name:{
        type:DataTypes.STRING,
    },

  });
};