const express = require('express');
const router = express.Router();
const episodesController = require('../Controllers/episodesController');

router.get('/', episodesController.getAllEpisodes);
router.get('/:id', episodesController.getEpisodeById);
router.post('/', episodesController.createEpisode);
router.put('/:id', episodesController.updateEpisode);
router.delete('/:id', episodesController.deleteEpisode);
router.get('/', episodesController.getEpisodeName);

module.exports = router;