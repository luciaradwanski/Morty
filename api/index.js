const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { PORT } = process.env;
const { default: axios } = require('axios');
const { Characters, Episodes, Locations } = require('./src/db.js')

// Syncing all the models at once.
conn.sync({ alter: true }).then( async() => { //CAMBIAR A {alter: true} CUANDO TERMINE DE CREAR TODO EL BACKEND
    await rickLoaded();
    await epLoaded();
    await locationLoaded();
    server.listen(PORT, () => {
        console.log(`🚀 Server listening at ${PORT}`); // eslint-disable-line no-console
    });
}); 

async function charactersLoaded() {
    try {
        let allChars = [];
        let nextPage = "https://rickandmortyapi.com/api/character";
        while (nextPage !== null) {
            const response = await axios.get(nextPage);
            const { results, info } = response.data;
            nextPage = info.next;
            results.forEach(({ id, name, status, species, gender, origin, image, episode, url }) => {
                allChars.push({
                    id,
                    name,
                    status,
                    species,
                    gender,
                    origin,
                    image,
                    episode,
                    url,
                });
            });
        }

        allChars.sort((a, b) => a.id - b.id); // sort by id
        return allChars;
    } catch (error) {
        throw new Error(error);
    }
}

async function rickLoaded() {
    try {
        const allChars = await charactersLoaded();

        await Promise.all(allChars.map(async char => {
            await Characters.findOrCreate({
                where: { id: char.id},
                defaults: {
                    name: char.name,
                    status: char.status,
                    species: char.species,
                    gender: char.gender,
                    origin: char.origin,
                    image: char.image,
                    episode: char.episode,
                    url: char.url
                }
            });
        }));

        console.log('Datos cargados en la BD');
    } catch (error) {
        console.log('Error al cargar los datos en la BD:', error);
    }
}

async function episodesLoaded() {
    try {
        let allEp = [];
        let nextPage = "https://rickandmortyapi.com/api/episode";
        while (nextPage !== null) {
            const response = await axios.get(nextPage);
            const { results, info } = response.data;
            nextPage = info.next;
            results.forEach(({ id, name, air_date, episode, characters, url }) => {
                allEp.push({
                    id,
                    name,
                    air_date, 
                    episode,
                    characters,
                    url
                });
            });
        }

        allEp.sort((a, b) => a.id - b.id); // sort by id
        return allEp;
    } catch (error) {
        throw new Error(error);
    }
}

async function epLoaded() {
    try {
        const allEpisodes = await episodesLoaded();

        await Promise.all(allEpisodes.map(async ep => {
            await Episodes.findOrCreate({
                where: { id: ep.id},
                defaults: {
                    name: ep.name,
                    air_date: ep.air_date, 
                    episode: ep.episode,
                    characters: ep.characters,
                    url: ep.url
                }
            });
        }));

        console.log('Episodes cargados en la BD');
    } catch (error) {
        console.log('Error al cargar los datos en la BD:', error);
    }
}

async function loadLocations() {
    try {
        let allLocation = [];
        let nextPage = "https://rickandmortyapi.com/api/location";
        while (nextPage !== null) {
            const response = await axios.get(nextPage);
            const { results, info } = response.data;
            nextPage = info.next;
            results.forEach(({ id, name, type, dimension, residents, url }) => {
                allLocation.push({
                    id,
                    name,
                    type,
                    dimension,
                    residents,
                    url
                });
            });
        }

        allLocation.sort((a, b) => a.id - b.id); // sort by id
        return allLocation;
    } catch (error) {
        throw new Error(error);
    }
}

async function locationLoaded() {
    try {
        const allL = await loadLocations();

        await Promise.all(allL.map(async lo => {
            await Locations.findOrCreate({
                where: { id: lo.id},
                defaults: {
                    name: lo.name,
                    type: lo.type,
                    dimension: lo.dimension,
                    residents: lo.residents,
                    url: lo.url
                }
            });
        }));

        console.log('Locations cargados en la BD');
    } catch (error) {
        console.log('Error al cargar los datos en la BD:', error);
    }
}
