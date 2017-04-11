const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const urlCheck = require('./middleware/urlCheck');

let env = process.env.NODE_ENV || 'development';
let port = process.env.PORT || 3000;
console.log(port);

let database;
if(env === 'development') {
  MongoClient.connect('mongodb://localhost:27017/users', function(err, db){
      database=db;
  });
} else {
  MongoClient.connect(process.env.MONGOLAB_URI, function(err, db){
      database=db;
  });
}






let app = express();

app.use('/', express.static(__dirname+'/public'));

app.get('/new/:url*', urlCheck,(req, res)=>{
  let urlCollection = database.collection('urls');
  urlCollection.insertOne(req.urlObject)
  .then((docs)=>{
    res.send(req.urlObject);
    // database.close();
  })
  .catch((e)=>{
    // database.close();
    res.status(404).send("Unexpected Error")
  });
});

app.get('/get/:id',(req, res)=>{
    let id = Number(req.params.id);
    console.log(typeof id);
    let urlCollection = database.collection('urls');
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

 app.get('/fetch', (req, res)=>{
        let url_collection = database.collection('urls');
        url_collection.find().toArray()
        .then((arr)=>{
          res.send(arr);
        })
        .catch((e)=>{
          res.status(400).send();
        });
 });



app.listen(port, ()=>{
  console.log("Server listening at port 3000");
});
