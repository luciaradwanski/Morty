const { DataTypes } = require("sequelize");
/* name, type, dimension, residents, url*/
module.exports = (sequelize) => {
    sequelize.define("Locations",{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            unique: true,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        dimension: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        residents: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false,
        },
        url:{
            type: DataTypes.STRING,
            allowNull: false
        },
        created: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
    },{ timestamps: false });
};