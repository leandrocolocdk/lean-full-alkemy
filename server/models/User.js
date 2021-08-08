const bcrypt = require('bcrypt');
const Operation = require("../models/Operation")

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        username: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: {
                    args: [3, 50],
                    message: 'The username must contain a minimum of 2 characters'
                }
            }
        },
        email: {
            type: DataTypes.STRING,
            required: true,
            validate: {
                isEmail: {
                    message: 'The email must be a valid email'
                }
            },
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [6, 30],
                    message: 'The password must have a minimum of 6 characters'
                }
            },
        },

    },
        {
            hooks: {
                beforeCreate: async (user) => {
                    const salt = await bcrypt.genSaltSync(10, 'a');
                    user.password = await bcrypt.hashSync(user.password, salt);
                },
                beforeUpdate: (user) => {
                    if (user.password) {
                        const salt = bcrypt.genSaltSync(10, 'a');
                        user.password = bcrypt.hashSync(user.password, salt);
                    }
                }
            }
        },
        {
            tableName: "users"
        }
    );

    User.validPassword = (password, hash) => {
        return bcrypt.compareSync(password, hash);
    }

    User.associate = (models) => {
        User.hasMany(models.Operation,
            {
                as: "operations", foreignKey: "userId"
            });
    };

    User.associate = (models) => {
        User.hasMany(models.Category,
            {
                as: "categories", foreignKey: "userId"
            });
    };

    return User;
};
