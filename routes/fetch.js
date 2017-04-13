const express = require('express');

const router  = express.Router();


router.use((req, res)=>{
       let url_collection = req.database.collection('urls');
       url_collection.find().toArray()
       .then((arr)=>{
         res.send(arr);
       })
       .catch((e)=>{
         res.status(400).send();
       });
});

module.exports = router;
