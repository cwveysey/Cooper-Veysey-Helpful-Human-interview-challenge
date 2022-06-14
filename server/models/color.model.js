module.exports = (sequelize, Sequelize) => {
    const Color = sequelize.define("color", {
        id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true
        }, 
        html_name: {
            type: Sequelize.STRING,
            allowNull: false
        }, 
        hex_code: {
            type: Sequelize.STRING,
            allowNull: false
        },
        group: { // See https://www.w3schools.com/colors/colors_groups.asp for color group definitions
            type: Sequelize.STRING,
            allowNull: false
        },
        rgb_string: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
    return Color;
};