const mongoose = require('mongoose');
const Place = require('../models/Place');
//mongoose.connect

const places = [
    {
        name: 'Ironhack',
        imgURL: String,
        description:'esta es un description',
        location:{lat:40.392580, lng:-3.698305},
        ratings:[{
            firstProperty:3,
            secondProperty:4,
        }]
    },
    {
        name: 'Casa del lettore',
        imgURL: String,
        description:'esta es un description',
        location:{lat:40.392753, lng:-3.698594},
        ratings:[{
            firstProperty:3,
            secondProperty:4,
        }]
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