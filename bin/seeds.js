const mongoose = require('mongoose');
const Place = require('../models/Place');
const {dbURL} = require('../config');
mongoose.connect(dbURL).then(() => console.log("Conectado!"));

const places = [
    {
        name: 'Ironhack',
        escription:'esta es un description',
        location:{lat:40.392580, lng:-3.698305},
        imageURL:"../uploads/f0e4152b0a079b70a224a9590b2b48f0"
    },
    {
        name: 'Casa del lettore',
        description:'esta es un description',
        location:{lat:40.392753, lng:-3.698594},
        imageURL:"../uploads/f0e4152b0a079b70a224a9590b2b48f0"
    },{
        name: "McDonald's Atocha",
        location:{lat:40.409709, lng:-3.692514},
    },{
        name:'Nemrut doner Kebab',
        location:{lat:40.390989, lng:-3.694164},
    },{
        name:'Chino',
        location:{lat:40.392171, lng:-3.695102}
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