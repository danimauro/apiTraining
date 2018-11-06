'use strict';
module.exports = (sequelize, DataTypes) => {
    const Usuario = sequelize.define('Usuario', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        identidad: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        apellido: {
            type: DataTypes.STRING,
            allowNull: false
        },
        telfijo: DataTypes.STRING,
        telcel: {
            type: DataTypes.STRING,
            allowNull: false
        },
        edad: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        sexo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        tipo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        fecregistro: {
            type: DataTypes.DATE,
            allowNull: false
        },
        estado: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }

    }, {});
    Usuario.associate = function(models) {
        Usuario.belongsToMany(models.Evento, {
            through: { model: models.Usuevento },
            foreignKey: 'usuarioId'
        });
    };
    return Usuario;
};