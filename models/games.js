//INDEX FOR COMBINING GAMES INTO ONE TABLE TO SEARCH

const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Game extends Model { }

Game.init(
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
        },
        game_type: {
            type: DataTypes.STRING,
            validate: {
                isIn: [['chess', 'chess4']]
            },
            allowNull: false,
            defaultValue: 'chess',
        },        
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'chess',
    }
)
