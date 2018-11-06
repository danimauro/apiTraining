'use strict';
module.exports = (sequelize, DataTypes) => {
    const Usuevento = sequelize.define('Usuevento', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        fecinscrip: {
            type: DataTypes.DATE,
            allowNull: false
        },
        estado: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    }, {});
    Usuevento.associate = function(models) {
        Usuevento.belongsTo(models.Usuario, { foreignKey: 'usuarioId' });
        Usuevento.belongsTo(models.Evento, { foreignKey: 'eventoId' });
    };
    return Usuevento;
};