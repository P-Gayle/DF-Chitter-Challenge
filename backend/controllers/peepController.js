const Peep = require('../models/peepModel')

// get all peeps and sort with newest at the top descending
const getAllPeeps = async (req, res) => {
    const peeps = await Peep.find({}).sort({ createdAt: -1 })
    
    res.status(200).json(peeps)
}

//create a new peep
const createPeep = async (req, res) => {
    const { message } = req.body

    let emptyField = []

    if (!message) {
        emptyField.push('message')
    }

    if (emptyField.length > 0) {
        return res.status(400).json({error: 'Please complete the form', emptyField})
    }

    //add document to database
    try {
        const user_id = req.user._id
        const peep = await Peep.create({ message, user_id })
        res.status(200).json(peep)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    createPeep,
    getAllPeeps
}