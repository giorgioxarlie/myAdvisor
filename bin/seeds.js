const mongoose = require('mongoose');
const Place = require('../models/Place');
const {dbURL} = require('../config');
mongoose.connect(dbURL).then(() => console.log("Conectado!"));

const places = [
    {
        name: 'Ironhack',
        imgURL: String,
        description:'esta es un description',
        location:{lat:40.392580, lng:-3.698305},
        ratings:[{
            firstProperty:3,
            secondProperty:4,
        }],
        imageURL:"../uploads/f0e4152b0a079b70a224a9590b2b48f0"
    },
    {
        name: 'Casa del lettore',
        imgURL: String,
        description:'esta es un description',
        location:{lat:40.392753, lng:-3.698594},
        ratings:[{
            firstProperty:3,
            secondProperty:4,
        }],
        imageURL:"../uploads/f0e4152b0a079b70a224a9590b2b48f0"
    }
]

Place.collection.drop();

places.forEach(p =>{
    let pr = new Place(p);
    pr.save((err,plc)=>{
        if(err){
            throw err;
        }
        console.log(`Sitio guardado ${plc.name}`);
    })
})

module.exports = places;