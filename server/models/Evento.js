'use strict';
module.exports = (sequelize, DataTypes) => {
    const Evento = sequelize.define('Evento', {
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
        imagen: DataTypes.STRING,
        fecevento: {
            type: DataTypes.DATE,
            allowNull: false
        },
        estado: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    }, {});
    Evento.associate = function(models) {
        
        Evento.belongsTo(models.Categoria, { foreignKey: 'cateId' });
        Evento.belongsTo(models.Organizacion, { foreignKey: 'orgaId' });
        Evento.belongsTo(models.Invitado, { foreignKey: 'invitadoId' });

        Evento.belongsToMany(models.Usuario, {
            through: { model: models.Usuevento},
            foreignKey: 'eventoId'
        });
    };
    return Evento;
};