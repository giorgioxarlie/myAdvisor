const express = require('express');
const router = express.Router();
const Places = require('../models/Place');
const multer = require('multer');
const upload = multer({dest:'./public/uploads/'});

router.get('/map',(req,res)=>{
  console.log("ENTRA")
  Places.find().exec((err, places) => {
    console.log(places)
    res.render('map', {places : places});
  });
})

router.post('/map',upload.single('image'),(req,res,next)=>{
    const {name, lat, lng, description} = req.body;

    const newPos = new Places({
        name,
        location:{lng,lat},
        description,
        imageURL:`../uploads/${req.file.filename}`,
      });

      newPos.save()
        .then(() => {
          console.log(`Se ha creado la posición ${lat} ${lng}`);
          res.redirect("/map")
        })
        .catch(e => next(e))
})

module.exports = router;