const mongoose = require('mongoose')

const PinSchema = mongoose.Schema({
    title: {type: String,required: true},
    description: {type: String,required: true},
    lat: {type: Number,required: true},
    lng: {type: Number,required: true}
})

module.exports = mongoose.model('Pin', PinSchema)