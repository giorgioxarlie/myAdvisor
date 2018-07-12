const mongoose = require('mongoose');
const Review = require('../models/Review');
const {dbURL} = require('../config');
mongoose.connect(dbURL).then(() => console.log("Conectado!"));

const reviews = [
    {
        place :'5b47662111366f592dd58e72',
        owner: '5b47663a2bfcde59759e09c5',
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
        place : '5b47662111366f592dd58e71',
        owner: '5b47663a2bfcde59759e09c5',
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