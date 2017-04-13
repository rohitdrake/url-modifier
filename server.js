const express = require('express');


const newUrl = require('./routes/new');
const getUrl = require('./routes/get');
const fetchUrl = require('./routes/fetch');

const MongoClient = require('mongodb').MongoClient;

let env = process.env.NODE_ENV || 'development';

let app = express();


  MongoClient.connect(process.env.MONGOLAB_URI, function(err, db){
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
