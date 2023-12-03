const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require('bcrypt')

class Player extends Model { }

Player.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            unique: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        player_number: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        game_type: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'chess'
        },
        time: {
            type: DataTypes.DECIMAL,
            defaultValue: 300,
        },
        inc: {
            type: DataTypes.INTEGER,
            defaultValue: 5,
        },
    },
    {
        hooks: {
            beforeCreate: async (newUserData) => {
                newUserData.password = await bcrypt.hash(newUserData.password, 10)
                return newUserData
            },
        },
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'player',
    }
)

module.exports = Player