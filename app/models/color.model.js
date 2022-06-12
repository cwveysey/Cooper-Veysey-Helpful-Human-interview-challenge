module.exports = (sequelize, Sequelize) => {
    const Color = sequelize.define("color", {
        id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true
        }, 
        hex_code: {
            type: Sequelize.STRING
        },
        group: { // See https://www.w3schools.com/colors/colors_groups.asp for color group definitions
            type: Sequelize.STRING
        },
        rgb_string: {
            type: Sequelize.STRING
        }
    });
    return Color;
};