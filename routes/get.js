const express = require('express');

const router =  express.Router();

router.get('/:id',(req, res)=>{
    let id = Number(req.params.id);
    console.log(typeof id);
    let urlCollection = req.database.collection('urls');
    urlCollection.findOne({unique_number: id})
    .then((doc)=>{
      console.log(doc);
      if(!doc) {
        res.status(400).send("The provided url does't exist in our database")
        return;
      };
      res.redirect(doc.sent_url);
      // res.writeHead(301,{Location:doc.sent_url});
      // res.end();
    }).catch((e)=>{
      res.status(404).send("Something Unexpected!!!!");
    })
});

module.exports = router;
