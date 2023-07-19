const mongoose = require('mongoose')
const Schema = mongoose.Schema
const toySchema = require('./toy')

const RequestSchema = new Schema( {
    status: String,
    toyInfo: [toySchema],
    toyOwnerId: { type: Schema.Types.ObjectId},
    lng: Number,
    lat: Number,
})

module.exports = mongoose.model('Request', RequestSchema);

