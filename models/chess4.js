const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Chess4 extends Model { }

Chess4.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            unique: true,
            autoIncrement: true,
        },
        FEN4: {
            type: DataTypes.TEXT,
            allowNull: false,
            defaultValue:  ''             //MUST FIND DEFAULT FEN4    

        },
        player_1: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'player',
                key: 'id'
            }
        },
        player_2: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'player',
                key: 'id'
            }
        },
        player_3: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'player',
                key: 'id'
            }
        },  
        player_4: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'player',
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
        bonus_time: {
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
            type: DataTypes.INTEGER,
            defaultValue: 1,
            validate: { isIn: [[1, -1]]} //1 Stands for White's turn (player1) : -1 Stands for Black's turn (player2)
        },
        moves: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        en_passant_target: {
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
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'chess4',
    }
)

module.exports = Chess4