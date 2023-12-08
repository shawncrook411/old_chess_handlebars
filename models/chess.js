const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Chess extends Model { }

Chess.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            unique: true,
            autoIncrement: true,
        },
        FEN: {
            type: DataTypes.TEXT,
            allowNull: false,
            defaultValue: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'

        },
        player_1: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        player_2: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        },            
        variant: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,            
        },
        time: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 300, //Value is stored as SECONDS
        },
        inc: {
            type: DataTypes.INTEGER,
            defaultValue: 3, //Value is stored as SECONDS
        },
        bonus: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        width: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 8,
            validate: {
                max: 20,
                min: 2,
            }
        },
        height: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 8,
            validate: {
                max: 20,
                min: 2,
            }
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        turn: {
            type: DataTypes.STRING,
            defaultValue: 1,
            validate: { isIn: [['w', 'b']]} 
        },
        moves: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        target: {
            type: DataTypes.STRING,
        },
        result: {
            type: DataTypes.STRING,
            validate: {
                isIn: [['1-0', '1/2-1/2', '0-1']]
            }
        },
        termination: {
            type: DataTypes.STRING,
            validate: {
                isIn: [['Checkmate', 'Resignation', 'Timeout', 'Stalemate', 'Draw by Agreement', 'Draw by Insufficent Material', 'Draw by Repitition', 'Draw by 50 move-rule']]
            }
        },
        date_time: {
            type: DataTypes.TIME,
            defaultValue: DataTypes.NOW
        },
        opening: {
            type: DataTypes.STRING,
        }
    },
    {
        sequelize,
        underscored: false,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'chess',
    }
)

module.exports = Chess