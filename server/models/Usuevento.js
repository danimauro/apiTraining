'use strict';
module.exports = (sequelize, DataTypes) => {
    const Usuevento = sequelize.define('Usuevento', {
        fecinscrip: {
            type: DataTypes.DATE,
            allowNull: false
        },
        fectermino: {
            type: DataTypes.DATE
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