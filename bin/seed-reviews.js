const mongoose = require('mongoose');
const Review = require('../models/Review');
const {dbURL} = require('../config');
mongoose.connect(dbURL).then(() => console.log("Conectado!"));

const reviews = [
    {
        place :'5a85c2cdf890329b228ebf7e',
        owner: "5a8487b48bb51caeca99f74a",
        prop1: 3,
        prop2: 4,
        prop3: 3,
        prop2: 4,
        prop4: 3,
        prop5: 4,
        prop6: 4,
        comment: "Muy BUEN baño."
    },
    {
        place : '5a85c2cdf890329b228ebf7e',
        owner: '5a8487b48bb51caeca99f74a',
        prop1: 3,
        prop2: 4,
        prop3: 3,
        prop2: 4,
        prop4: 3,
        prop5: 4,
        prop6: 4,
        comment: "Muy MAL baño."
        }]

Review.collection.drop();

reviews.forEach(p =>{
    let pr = new Review(p);
    pr.save((err,rvw)=>{
        if(err){
            throw err;
        }
        console.log(`Commento guardado ${rvw.place}`);
    })
})

module.exports = reviews;