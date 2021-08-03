const bcrypt = require('bcrypt');
const Operation = require("../models/Operation")

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        username: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: {
                    args: [3, 50],
                    msg: 'The username must contain a minimum of 2 characters'
                }
            }
        },
        email: {
            type: DataTypes.STRING,
            required: true,
            validate: {
                isEmail: {
                    msg: 'The email must be a valid email'
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
                    msg: 'The password must have a minimum of 6 characters'
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
        }
    );
    User.validPassword = async (password, hash) => {
        return await bcrypt.compareSync(password, hash);
    }

    User.associate = (models) => {
        User.hasMany(models.Operation,
            {
                as: "operations", foreignKey: "userId",
                onDelete: "cascade"
            });
    };

    return User;
};
