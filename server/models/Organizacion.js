'use strict';
module.exports = (sequelize, DataTypes) => {
    const Organizacion = sequelize.define('Organizacion', {
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
        imagen: {
            type: DataTypes.STRING,
            allowNull: false
        },
        estado: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    }, {});
    Organizacion.associate = function(models) {
        Organizacion.hasMany(models.Evento, { foreignKey: 'orgaId' });
    };
    return Organizacion;
};