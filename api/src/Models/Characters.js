const { DataTypes } = require("sequelize");
/* id, name, status, species, gender, origin, image, episode, url*/
module.exports = (sequelize) => {
    sequelize.define("Characters",{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status:{
            type: DataTypes.ENUM('Alive', 'Dead', 'unknown'),
            allowNull: false,
        },
        species: {
            type: DataTypes.ENUM('Human', 'Alien', 'unknown'),
            allowNull: false,
            defaultValue: 'unknown',
        },
        gender:{
            type: DataTypes.ENUM('Female', 'Male', 'unknown'),
            allowNull: false,
        },
        origin: {
            type: DataTypes.JSON,
            allowNull: false,
            defaultValue: {
                name: '',
                url: ''
            }
        },
        image: {
            type: DataTypes.STRING,
        },
        episode: {
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