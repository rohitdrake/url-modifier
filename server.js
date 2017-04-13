const express = require('express');
const MongoClient = require('mongodb').MongoClient;

const newUrl = require('./routes/new');
const getUrl = require('./routes/get');
const fetchUrl = require('./routes/fetch');


let app = express();
console.log("OK!!!!!!");
MongoClient.connect("mongodb://rohitdrake:userurls003#@ds157980.mlab.com:57980/userurls", function(err, db){
      app.use((req, res, next)=>{
      req.database=db;
      next();
      });
      app.use('/', express.static(__dirname+'/public'));

      app.use('/new', newUrl);
      app.use('/get', getUrl);
      app.use('/fetch', fetchUrl);
});

app.set('port', (process.env.PORT || 3000));
app.listen(app.get('port'), ()=>{
  console.log("Server listening at port, "+app.get('port'));
});
