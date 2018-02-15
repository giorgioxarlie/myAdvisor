const mongoose = require('mongoose');
const Review = require('../models/Review');
const {dbURL} = require('../config');
mongoose.connect(dbURL).then(() => console.log("Conectado!"));

const reviews = [
    {
        place : Ironhack,
        owner: "5a8487b48bb51caeca99f74a",
        propx: 3,
        propy: 4,
        avgrev: 3,
        comment: "Muy BUEN baño."
    },
    {
        place : Ironhack,
        owner: Xarlie,
        propx: 2,
        propy: 1,
        avgrev: 1,
        comment: "Muy MAL baño."
        }]

Review.collection.drop();

reviews.forEach(p =>{
    let pr = new Review(r);
    pr.save((err,rvw)=>{
        if(err){
            throw err;
        }
        console.log(`Sitio guardado ${rvw.name}`);
    })
})

module.exports = places;