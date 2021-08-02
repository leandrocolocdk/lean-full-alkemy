const { Operation, User } = require("../models")

module.exports = (sequelize, DataTypes) => {
    const Operation = sequelize.define("Operation", {
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
        // category: {
        //     type: DataTypes.STRING,
        //     allowNull: false,
        //     notEmpty: true,
        // },
        type: {
            type: DataTypes.ENUM(['egress', 'entry']),
            validate: {
                isIn: {
                    args: [['egress', 'entry']],
                    msg: "Must be egress or entry"
                }
            },
            allowNull: false,
        },
    });

    Operation.associate = (models) => {
        Operation.belongsTo(models.User,
            // { foreignKey: "UserId" }
        );
    };

    return Operation;
};
