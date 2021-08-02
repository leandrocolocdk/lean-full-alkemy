const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        username: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [3, 50],
                // msg: 'El nombre tiene demasiados carácteres'
            }
        },
        email: {
            type: DataTypes.STRING,
            required: true,
            isEmail: true,

            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            len: {
                max: 20,
                min: 6,
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
        User.hasMany(models.Operation, {
            onDelete: "cascade"
        });
    };

    return User;
};
