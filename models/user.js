const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require('bcrypt')

class User extends Model { }

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            unique: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {len: [8]}
        },
        elo: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1200,
            validate: {min: 150},
        },
        k_factor: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 40,
            validate: {min: 1, max: 100}
        },
        admin: {
            type: DataTypes.BOOLEAN,    
            defaultValue: false,
        }        
    },
    {       
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'user',
    }
)

module.exports = User