const mongoose = require('mongoose');
const User = require('../models/User');
const {dbURL} = require('../config');
mongoose.connect(dbURL).then(() => console.log("Conectado!"));

const users = [
    {
        username: 'Italian_wc_master',
        email: 'ciao',
        password: '$2a$10$junJSxPJYBVj/LmAtXEai.qZonchROEEGQCKpaVqV5S3F9ckvbTRa',
    }]

User.collection.drop();

users.forEach(p =>{
    let pr = new User(p);
    pr.save((err,usr)=>{
        if(err){
            throw err;
        }
        console.log(`Utente guardado ${usr.username}`);
    })
})

module.exports = users;