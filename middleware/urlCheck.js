const MongoClient = require('mongodb').MongoClient;

let env = process.env.NODE_ENV || 'development';

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



module.exports = function(req, res, next) {
  let sent_url = req.params['url']+req.params['0'];
  let unique_number;
  let result = /(http|https)\:\/\/\w{3}\.\w{1,}\.(com|in|org)/.test(sent_url);
  sent_url = req.params['0'];
  if(!result){
    res.status(400).send("Please send a valid url");
    return;
  }
  if(!result) {
    res.status(406).send("Invalid URL");
    // database.close();
    return;
  }
  let urlCollection = database.collection('urls');
  let array_url_promise = urlCollection.find().toArray();
  array_url_promise.then(function(arr){
    if(arr.length===0){
      unique_number=0;
      req.urlObject={unique_number, sent_url};
      next();
    } else {

      arr.forEach((doc)=>{
      result = (doc.sent_url!==sent_url);
      if(!result){
        console.log("Duplicate");
        return;
      }
      });
      if(result){
        unique_number=arr[arr.length-1].unique_number+1;
        req.urlObject={unique_number, sent_url};
        console.log(req.urlObject);
        // database.close();
        next();
        return;
      }
      res.status(406).send("Duplicate address");
      // database.close();
    }
  }).catch((e)=>{
  res.status(404).send("Unable to save");
  // database.close();
  });
}
