const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Strain extends Model{};

Strain.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'strain'
    }
);

module.exports = Strain;