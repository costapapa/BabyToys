const mongoose = require('mongoose');
const Schema = mongoose.Schema
// const request = require('request')
const { Client } = require("@googlemaps/google-maps-services-js");
const dotenv = require('dotenv').config()

const requestSchema = new Schema({
    status: { 
        type: Boolean, 
        default: true,
    },
    approved: {
        type: Boolean,
        default: false,
    },
    requestedBy: {
        type: Schema.Types.ObjectId
    }
},{
     timestamps: true
})

const toySchema = new Schema({
    title: String,
    date: Date,
    condition: String,
    img: String,
    location: String,
    description: String,
    toyOwnerId: { type: Schema.Types.ObjectId },
    request: [requestSchema]
}, {
    timestamps: true
})

 const googleKey = process.env.REACT_APP_GOOGLEKEY

toySchema.pre('save', async function (next) {
    if (!this.isModified('location') && !this.isNew) return next();
    try {
        const client = new Client()
        const apiKey = googleKey;
        const response = await client.geocode({
            params: {
                address: this.location,
                region: 'uk',
                key: apiKey
            }
        });
        const { lat, lng } = response.data.results[0].geometry.location;
        const geocodeInfo = { lat, lng };
        this.location = `${geocodeInfo.lat}, ${geocodeInfo.lng}`
    } catch (error) {
        console.log('ERROR', error)
    }
    return next();
})







module.exports = mongoose.model('Toy', toySchema)