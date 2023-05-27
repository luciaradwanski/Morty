const { Characters, Episodes } = require('../db')
const axios = require('axios');

let allChars = []
// const getCharactersInfo = async () => {
//     try {
        
//         const response = await axios.get("https://rickandmortyapi.com/api/character")
//         let characters = response.data
        
//         for (let i = 0; i < 41; i++) {
//             for (const el of characters.results) {
//                 allChars[i] = {
//                     id: el.id,
//                     name: el.name,
//                     status: el.status,
//                     species: el.species,
//                     gender: el.gender,
//                     origin: el.origin,
//                     image: el.image,
//                     episode: el.episode.map(e => e),
//                     url: el.url
//                 };
//                 i++;
//             }
//             let aux = await axios.get(characters.info.next)
//             characters = aux.data
//         }        
        
//         return allChars
        
//     } catch (error) {
//         throw new Error(error) 
//     }
// }

// const getCharactersInfo = async () => {
//     try {
//       let allChars = [];
//       let nextPage = "https://rickandmortyapi.com/api/character";
  
//       while (nextPage !== null) {
//         const response = await axios.get(nextPage);
//         const { results, info } = response.data;
//         nextPage = info.next;
  
//         results.forEach(({ id, name, status, species, gender, origin, image, episode, url }) => {
//           allChars.push({
//             id,
//             name,
//             status,
//             species,
//             gender,
//             origin,
//             image,
//             episode,
//             url,
//           });
//         });
//       }
  
//       return allChars;
//     } catch (error) {
//       throw new Error(error);
//     }
//   };

// const saveApiData = async (req, res) => {

//     try {
//         let result = await getCharactersInfo()
//         console.log(Characters)
//         await Characters.bulkCreate(result)
//         return res.json(result)
//     } catch (error) {
//         return res.status(400).json({error: error.message})
//     }
    
// }


// const getCharacterDbInfo = async() => {
//     return await Characters.findAll({
//         include: {
//             model: Episodes,
//             attributes: ['name', 'air_date', 'episode', 'characters', 'url'],
//             throw: {
//                 attributes: [],
//             },
//         }
//     })
// }

// const characterInfo = async () => {
//     const characterInfo = await getCharactersInfo();
//     const dbInfo = await getCharacterDbInfo();
//     const infoTotal = characterInfo.concat(dbInfo);
//     return infoTotal
// }

/* Get all Characters */
const getAllCharacters = async (req, res) => {
    
    try {
        // const charactersTotal = await characterInfo(); 
        const charactersTotal = await Characters.findAll(
            {
                include: {
                    model: Episodes,
                    attributes: ['name', 'air_date', 'episode', 'characters', 'url'],
                    throw: {
                        attributes: [],
                    },
                },
                order: [['id', 'ASC']]
            }
        ) 
        res.status(200).json(charactersTotal)
    } catch (error) {
        res.status(400).json({message: 'No se cargan los personajes'})
    }
};

/* Get a Character by Id */
// const getCharacterById = async (req, res) => {
//     try {
//         const charId = await Characters.findByPk(req.params.id);
//         if (!charId) {
//         res.status(404).json({ message: 'Character not found' });
//         } else {
//         res.status(200).json(charId);
//         }
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };
const getCharacterById = async (req, res) => {
    try {
        const charId = await Characters.findByPk(req.params.id);
        if (!charId) {
            // Buscamos el personaje en la lista de personajes buscados anteriormente
            const searchedChar = this.state.character.find((char) => char.id.toString(10) === req.params.id);
            if (searchedChar) {
                // Si encontramos el personaje en la lista, devolvemos un mensaje indicando que ya se buscó
                res.status(400).json({ message: 'El personaje ya se buscó anteriormente' });
            } else {
            // Si no encontramos el personaje en la lista, buscamos en la base de datos
                const charId = await Characters.findByPk(req.params.id);
                if (!charId) {
                    res.status(404).json({ message: 'Character not found' });
                } else {
                    res.status(200).json(charId);
                }
            }
        } else {
            res.status(200).json(charId);
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};  
/*
const getCharacterById = async (req, res) => {
  try {
    const charId = await Characters.findByPk(req.params.id);
    if (!charId) {
      // Buscamos el personaje en la lista de personajes buscados anteriormente
      const searchedChar = this.state.character.find((char) => char.id.toString(10) === req.params.id);
      if (searchedChar) {
        // Si encontramos el personaje en la lista, devolvemos un mensaje indicando que ya se buscó
        res.status(400).json({ message: 'El personaje ya se buscó anteriormente' });
      } else {
        // Si no encontramos el personaje en la lista, buscamos en la base de datos
        const charId = await Characters.findByPk(req.params.id);
        if (!charId) {
          res.status(404).json({ message: 'Character not found' });
        } else {
          res.status(200).json(charId);
        }
      }
    } else {
      res.status(200).json(charId);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

*/

/* Create a new Character*/
const createCharacter = async (req, res) => {
    try {
        const {name, status, species, gender, origin, image, episode, url} = req.body;
        const character = await Characters.create({
            name, status, species, gender, origin, image, episode, url
        });

        // Asocia la instancia de Hotel correspondiente
        // const h = await Episodes.findByPk(hotel);
        // if (!h) {
        //     throw new Error('Hotel not found');
        // }
        // await activ.setHotel(h);
        res.status(201).json(character);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a Character by ID
const updateCharacter = async (req, res) => {
    try {
        const [ updatedRows, [ updatedCharacter ] ] = await Characters.update(req.body, {
            returning: true,
            where: { id: req.params.id }
        });
        if (updatedRows === 0) {
            res.status(404).json({ message: 'Character not found' });
        } else {
            res.status(200).json(updatedCharacter);
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a Character by ID
const deleteCharacter = async (req, res) => {
    try {
        const deletedCharacter = await Characters.destroy({
            where: { id: req.params.id }
        });
        if (deletedCharacter === 0) {
            res.status(404).json({ message: 'Character not found' });
        } else {
            res.status(204).json();
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};



const getCharacterName = async (req, res) => {
    const {name} = req.query;
    try {
        
        const cart = await Characters.findAll({
        attributes: ['id', 'name', 'status', 'species', 'gender', 'origin', 'image', 'episode', 'url'],
        where: { name: {[Op.iLike]: "%" + name + "%"} }
        });
        if (cart === null) {
        res.status(404).json({ message: 'Character not found' });
        } else {
        res.status(200).json(cart);
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = {
    getAllCharacters,
    getCharacterById,
    createCharacter,
    updateCharacter,
    deleteCharacter,
    getCharacterName
};