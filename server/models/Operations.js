module.exports = (sequelize, DataTypes) => {
    const Operations = sequelize.define("Operations", {
        concept: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
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

    return Operations;
};
