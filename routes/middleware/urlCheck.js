module.exports = function(req, res, next) {
  console.log(req.params);
  let sent_url = req.params['url']+req.params['0'];
  let unique_number;
  let result = /(http|https)\:\/\/\w{3}\.\w{1,}\.(com|in|org)/.test(sent_url);
  sent_url = req.params['0'];
  if(!result) {
    res.status(406).send("Invalid URL");

    return;
  }
  let urlCollection = req.database.collection('urls');
  let array_url_promise = urlCollection.find().toArray();
  array_url_promise.then(function(arr){
    if(arr.length===0){
      unique_number=0;
      req.urlObject={unique_number, sent_url};
      next();
    } else {

      arr.forEach((doc)=>{
      result = (doc.sent_url!==('https:'+sent_url));
      if(!result){
        console.log("Duplicate");
        return;
      }
      });
      if(result){
        unique_number=arr[arr.length-1].unique_number+1;
        req.urlObject={unique_number, sent_url};
        console.log(req.urlObject);

        next();
        return;
      }
      res.status(406).send("Duplicate address");

    }
  }).catch((e)=>{
  res.status(404).send("Unable to save");

  });
}
