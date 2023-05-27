const { Episodes, Characters } = require('../db')
const axios = require('axios')

let allEp = []

const getEpisodeInfo = async () => {
    const episodeUrl = await axios.get('https://rickandmortyapi.com/api/episode')
    let episodeInfo = await episodeUrl.data
    
    for(let i = 0; i < 2; i++) {
        episodeInfo.results.map(ep => {
            allEp.push({
                id: ep.id,
                name: ep.name,
                air_date: ep.air_date, 
                episode: ep.episode,
                characters: ep.characters.map(el => el),
                url: ep.url
            })
        })

        let aux = await axios.get(episodeInfo.info.next)
        episodeInfo = aux.data
    }
    
    return allEp;
};

const getEpisodesDbInfo = async() => {
    return await Episodes.findAll({
        include: {
            model: Characters,
            attributes: ['name', 'status', 'species', 'gender', 'origin', 'image', 'episode', 'url'],
            throw: {
                attributes: [],
            },
        }
    })
};

const episodeInfo = async () => {
    const episodeInfo = await getEpisodeInfo();
    const dbInfo = await getEpisodesDbInfo();
    const infoTotal = episodeInfo.concat(dbInfo);
    return infoTotal
}

/* Get all Characters */
const getAllEpisodes = async (req, res) => {
    try {
        const episodesTotal = await Episodes.findAll({
            include: {
                model: Characters,
                attributes: ['name', 'status', 'species', 'gender', 'origin', 'image', 'episode', 'url'],
                throw: {
                    attributes: [],
                },
            },
            order: [['id', 'ASC']]
        })
        res.status(200).json(episodesTotal)
    } catch (error) {
        
    }
};

/* Get a Character by Id */
const getEpisodeById = async (req, res) => {
    try {
        const epId = await Episodes.findByPk(req.params.id);
        if (!epId) {
        res.status(404).json({ message: 'Episode not found' });
        } else {
        res.status(200).json(epId);
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


/* Create a new Character*/
const createEpisode = async (req, res) => {
    try {
        const {name, air_date, episode, characters, url} = req.body;
        const episodes = await Characters.create({
            name, air_date, episode, characters, url
        });

        // Asocia la instancia de Hotel correspondiente
        // const h = await Episodes.findByPk(hotel);
        // if (!h) {
        //     throw new Error('Hotel not found');
        // }
        // await activ.setHotel(h);
        res.status(201).json(episodes);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a Character by ID
const updateEpisode = async (req, res) => {
    try {
        const [ updatedRows, [ updatedEpisode ] ] = await Episodes.update(req.body, {
            returning: true,
            where: { id: req.params.id }
        });
        if (updatedRows === 0) {
            res.status(404).json({ message: 'Episode not found' });
        } else {
            res.status(200).json(updatedEpisode);
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a Character by ID
const deleteEpisode = async (req, res) => {
    try {
        const deletedEpisode = await Episodes.destroy({
            where: { id: req.params.id }
        });
        if (deletedEpisode === 0) {
            res.status(404).json({ message: 'Episode not found' });
        } else {
            res.status(204).json();
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};



const getEpisodeName = async (req, res) => {
    const {name} = req.query;
    try {
        
        const cart = await Characters.findAll({
        attributes: ['id', 'name', 'air_date', 'episode', 'characters', 'url'],
        where: { name: {[Op.iLike]: "%" + name + "%"} }
        });
        if (cart === null) {
        res.status(404).json({ message: 'Episode not found' });
        } else {
        res.status(200).json(cart);
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = {
    getAllEpisodes,
    getEpisodeById,
    createEpisode,
    updateEpisode,
    deleteEpisode,
    getEpisodeName
};