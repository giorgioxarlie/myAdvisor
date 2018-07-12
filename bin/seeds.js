const mongoose = require('mongoose');
const Place = require('../models/Place');
const {dbURL} = require('../config');
mongoose.connect(dbURL).then(() => console.log("Conectado!"));

const places = [
    {
        name: 'Ironhack',
        escription:'esta es un description',
        location:{lat:40.392580, lng:-3.698305},
        imageURL:"../uploads/0f1de7b6ab2b9952bc5b3308b494cc41"
    },
    {
        name: 'Casa del lettore',
        description:'esta es un description',
        location:{lat:40.392753, lng:-3.698594},
        imageURL:"../uploads/bbebf693916454ebd3f608b2a3339d4c"
    },{
        name: "McDonald's Atocha",
        location:{lat:40.409709, lng:-3.692514},
    },{
        name:'Nemrut doner Kebab',
        location:{lat:40.390989, lng:-3.694164},
    },{
        name:'Chino',
        location:{lat:40.392171, lng:-3.695102}
    },{
        name:'Baño enbajada italiana',
        location:{lat:40.432324, lng:-3.683955}
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