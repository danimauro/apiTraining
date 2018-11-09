'use strict';
module.exports = (sequelize, DataTypes) => {
    const Categorias = sequelize.define('Categorias', {
        codigo: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        descrip: DataTypes.STRING,
        estado: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    }, {});
    Categorias.associate = function(models) {
        // associations can be defined here
        Categorias.hasMany(models.Evento, {foreignKey: 'cateId'});
    };
    return Categorias;
};