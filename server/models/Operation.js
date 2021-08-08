const User = require("../models/User")

module.exports = (sequelize, DataTypes) => {
    const Operation = sequelize.define('Operation', {
        concept: {
            type: DataTypes.STRING,
            allowNull: false,
            notEmpty: true,
        },
        amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            notEmpty: true,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
            notEmpty: true,
        },

        type: {
            type: DataTypes.ENUM(['egress', 'entry']),
            validate: {
                isIn: {
                    args: [['egress', 'entry']],
                    message: "Must be egress or entry"
                }
            },
            allowNull: false,
        },
        category: {
            type: DataTypes.STRING,
            allowNull: true,
            notEmpty: false,
        },
    });

    Operation.associate = (models) => {
        Operation.belongsTo(models.User, { as: "author", foreignKey: "userId" });
    };

    return Operation;
};
