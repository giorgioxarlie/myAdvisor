const express = require('express');
require('dotenv').config();


const router = express.Router();
const multer = require('multer');
const Places = require('../models/Place');

const upload = multer({ dest:'./public/uploads/' });

router.get('/map', (req, res) => {
  Places.find().exec((err, places) => {
    res.render('map', { places, API_MAP:process.env.API_MAP });
  });
});

router.post('/map', upload.single('image'), (req, res, next) => {
  const {
    name, lat, lng, description,
  } = req.body;

  const newPos = new Places({
    name,
    location:{ lng, lat },
    description,
    imageURL:`../uploads/${req.file.filename}`,
  });

  newPos.save()
    .then(() => {
      console.log(`Se ha creado la posición ${lat} ${lng}`);
      res.redirect('/map');
    })
    .catch(e => next(e));
});

module.exports = router;
