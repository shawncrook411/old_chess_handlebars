const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class FEN_table extends Model { }

FEN_table.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            unique: true,
            autoIncrement: true,
        },
        game_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'chess',
                key: 'id'
            },
        },
        FEN: {
            type: DataTypes.TEXT,
            allowNull: false,
        }
    },
    {
        sequelize,
        underscored: false,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'fen_table',
    }
)

module.exports = FEN_table