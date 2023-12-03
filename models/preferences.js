const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Preferences extends Model { }

Preferences.init(
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
            primaryKey: true,
            unique: true,
            autoIncrement: false,
            references: {
                model: 'user',
                key: 'id',
            }
        },
        style: {
            type: DataTypes.STRING,
            validate: {isIn: [['pixel', 'cburnett', 'merida', 'alpha',
            'pirouetti', 'chessnut', 'reillycraig',
            'companion', 'riohacha', 'kosal', 'leipzig',
            'fantasy', 'spatial', 'celtic', 'california',
            'caliente', 'pixel', 'maestro', 'fresca',
            'cardinal', 'gioco', 'tatiana', 'staunty',
            'governor', 'dubrovny', 'icpieces', 'mpchess',
            'kiwen-suwi', 'horsey', 'anarcandy', 'shapes',
            'letter', 'disguised']]},
            defaultValue: 'pixel'
        },
        primary_board_color: {
            type: DataTypes.STRING,
            validate: { is: /^#[0-9A-F]{6}$/i },
            defaultValue: '#1750AC'
        },
        secondary_board_color: {
            type: DataTypes.STRING,
            validate: { is: /^#[0-9A-F]{6}$/i },
            defaultValue: '#73B9EE'
        },
        primary_player_color: {
            type: DataTypes.STRING,
            validate: { is: /^#[0-9A-F]{6}$/i },
            defaultValue: '#ffffff'
        },
        secondary_player_color: {
            type: DataTypes.STRING,
            validate: { is: /^#[0-9A-F]{6}$/i },
            defaultValue: '#000000'
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'preferences',
    }
)

module.exports = Preferences
