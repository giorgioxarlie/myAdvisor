const isLoggedIn = require('../middlewares/isLoggedIn');
const onlyMe = require('../middlewares/onlyMe');
const User = require('../models/User');
const Review = require('../models/Review');
const express = require('express');
const multer = require('multer');

const router = express.Router();

const upload = multer({ dest: './public/uploads/' });

router.get('/', (req, res, next) => {
  res.render('profile/show');
});

router.get('/:id/myreviews', (req, res, next) => {
  const ownerid = req.params.id;
  Review.find({ owner: ownerid })
    .exec()
    .then((reviews) => {
      res.render('profile/myreviews', { reviews });
    })
    .catch(e => next(e));
});

router.get('/:id/edit', (req, res, next) => {
  const userId = req.params.id;
  User.findById(userId)
    .exec()
    .then((user) => {
      res.render('profile/edit', { user });
    })
    .catch(e => next(e));
});

router.post('/:id/edit', upload.single('image'), (req, res, next) => {
  const userId = req.params.id;
  User.findById(userId, (err, img) => {
    if (req.file === undefined) {
      a = img.imgURL;
    } else {
      a = `../uploads/${req.file.filename}`;
    }

    const updates = {
      username: req.body.name,
      email: req.body.email,
      imgURL: a,
    };
    // console.log(updates)

    User.findByIdAndUpdate(userId, updates, (error, result) => {
      if (errror) {
        console.log(error);
      }
      res.redirect('/profile');
    });
  });
});

module.exports = router;
