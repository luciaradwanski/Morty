const { Locations, Characters } = require('../db')
const axios = require('axios')



const getLocationInfo = async () => {
    const locationUrl = await axios.get('https://rickandmortyapi.com/api/location')
    const locationInfo = await locationUrl.data.results.map(el => {
        return {
            id: el.id,
            name: el.name,
            type: el.type, 
            dimension: el.dimension,
            residents: el.characters.map(el => el),
            url: el.url
        };
    });
    return locationInfo;
};

const getLocationDbInfo = async() => {
    return await Locations.findAll({
        include: {
            model: Characters,
            attributes: ['name', 'status', 'species', 'gender', 'origin', 'image', 'episode', 'url'],
            throw: {
                attributes: [],
            },
        }
    })
};

const locationInfo = async () => {
    const locationInfo = await getLocationInfo();
    const dbInfo = await getLocationDbInfo();
    const infoTotal = locationInfo.concat(dbInfo);
    return infoTotal
}

/* Get all Characters */
const getAllLocations = async (req, res) => {
    try {
        const locationTotal = await Locations.findAll({
            include: {
                model: Characters,
                attributes: ['name', 'status', 'species', 'gender', 'origin', 'image', 'episode', 'url'],
                throw: {
                    attributes: []
                },
            },
            order: [['id', 'ASC']]
        })
        res.status(200).json(locationTotal)
    } catch (error) {
        res.status(400).json({message: 'No se cargan las locations'})
    }
};

/* Get a Character by Id */
const getLocationById = async (req, res) => {
    try {
        const epId = await Locations.findByPk(req.params.id);
        if (!epId) {
        res.status(404).json({ message: 'Location not found' });
        } else {
        res.status(200).json(epId);
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


/* Create a new Character*/
const createLocation = async (req, res) => {
    try {
        const {name, type, dimension, residents, url} = req.body;
        const locations = await Locations.create({
            name, type, dimension, residents, url
        });

        // Asocia la instancia de Hotel correspondiente
        // const h = await Episodes.findByPk(hotel);
        // if (!h) {
        //     throw new Error('Hotel not found');
        // }
        // await activ.setHotel(h);
        res.status(201).json(locations);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a Character by ID
const updateLocation = async (req, res) => {
    try {
        const [ updatedRows, [ updatedLocation ] ] = await Locations.update(req.body, {
            returning: true,
            where: { id: req.params.id }
        });
        if (updatedRows === 0) {
            res.status(404).json({ message: 'Location not found' });
        } else {
            res.status(200).json(updatedLocation);
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a Character by ID
const deleteLocation = async (req, res) => {
    try {
        const deletedLocation = await Locations.destroy({
            where: { id: req.params.id }
        });
        if (deletedLocation === 0) {
            res.status(404).json({ message: 'Location not found' });
        } else {
            res.status(204).json();
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};



const getLocationName = async (req, res) => {
    const {name} = req.query;
    try {
        
        const cart = await Locations.findAll({
        attributes: ['id', 'name', 'type', 'dimension', 'residents', 'url'],
        where: { name: {[Op.iLike]: "%" + name + "%"} }
        });
        if (cart === null) {
        res.status(404).json({ message: 'Location not found' });
        } else {
        res.status(200).json(cart);
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = {
    getAllLocations,
    getLocationById,
    createLocation,
    updateLocation,
    deleteLocation,
    getLocationName
}