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
        chess_win_count: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        chess_loss_count: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        chess_draw_count: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        chess_win_streak: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        chess_loss_streak: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        admin: {
            type: DataTypes.BOOLEAN,    
            defaultValue: false,
        }        
    },
    {
        hooks: {
            beforeBulkCreate: (newUserData) => {
                newUserData.forEach((newUser) => {
                    newUser.password =  bcrypt.hashSync(newUser.password, 10)                                       
                })   
            },
            beforeCreate: (newUserData) => {
                newUserData.password = bcrypt.hashSync(newUserData.password, 10)
            }
        },   
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user',
    }
)

module.exports = User