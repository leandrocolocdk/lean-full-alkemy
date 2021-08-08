const User = require("../models/User")

module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            notEmpty: true,
            unique: true// revisar
        },
    });

    Category.associate = (models) => {
        Category.belongsTo(models.User, { as: "author", foreignKey: "userId" });
    };

    return Category;
};
