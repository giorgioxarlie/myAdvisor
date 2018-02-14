const express = require('express');
const router = express.Router();
const Comments = require('../models/Comment');

router.post('/edit/:id', (req,res)=>{
    let id = req.params.id;
    let comment = req.body.comment;
    let c = new Comments({place:id,comment: comment});
    c.save(err=>{
        if(err){return next(err)};
        console.log(`Added ${comment} to ${id}`);
        res.redirect(`/detail/${id}`);
    })
})

module.exports = router;