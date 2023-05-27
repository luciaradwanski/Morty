const express = require('express');
const router = express.Router();
const charactersController = require('../Controllers/charactersController');

router.get('/', charactersController.getAllCharacters);
router.get('/:id', charactersController.getCharacterById);
router.post('/', charactersController.createCharacter);
router.put('/:id', charactersController.updateCharacter);
router.delete('/:id', charactersController.deleteCharacter);
router.get('/', charactersController.getCharacterName);

module.exports = router;