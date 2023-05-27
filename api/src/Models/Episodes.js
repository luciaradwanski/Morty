const { DataTypes } = require("sequelize");
/* name, air_date, episode, characters, url*/
module.exports = (sequelize) => {
    sequelize.define("Episodes",{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            unique: true,
        },
        air_date: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        episode: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        characters: {
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