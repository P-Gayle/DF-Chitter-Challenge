const mongoose = require('mongoose')

const Schema = mongoose.Schema

//structure of documents saved to the collection
const peepSchema = new Schema({
    message: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
}, { timestamps: true })

//Peep below = collection/model in database
module.exports = mongoose.model('Peep', peepSchema)