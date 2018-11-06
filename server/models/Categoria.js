'use strict';
module.exports = (sequelize, DataTypes) => {
    const Categoria = sequelize.define('Categoria', {
        id: {
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
    Categoria.associate = function(models) {
        // associations can be defined here
        Categoria.hasMany(models.Evento);
    };
    return Categoria;
};