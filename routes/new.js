const express = require('express');

const router  = express.Router();

const urlCheck = require('./middleware/urlCheck');


router.get('/:url*', urlCheck,(req, res)=>{
  let urlCollection = req.database.collection('urls');
  urlCollection.insertOne(req.urlObject)
  .then((docs)=>{
    res.send(req.urlObject);
  })
  .catch((e)=>{

    res.status(404).send("Unexpected Error")
  });
});

module.exports=router;
