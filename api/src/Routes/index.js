const {Router} = require('express')
const charactersRouter = require('./charactersRouter');
const episodesRouter = require('./episodesRouter')
const locationRouter = require('./locationRouter')

const router = Router();

router.use('/characters', charactersRouter);
router.use('/episodes', episodesRouter);
router.use('/location', locationRouter)

module.exports = router;