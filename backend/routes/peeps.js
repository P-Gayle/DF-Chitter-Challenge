const express = require('express')
const { createPeep, getAllPeeps } = require('../controllers/peepController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

//to get all peeps
router.get('/api/*', getAllPeeps)

//auth only applies to createPeep.
router.use(requireAuth)
//post a new peep - createPeep is from peepController
router.post('/', createPeep)

module.exports = router;