var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

app.get('/test',function(req,res){
   MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("mydb");
      dbo.collection("tasks").find({}).toArray(function(err, result) {
         if (err) throw err;
         db.close();
         res.json(result);
       });
     });
     
   });

var server = app.listen(8081, function () {
   console.log("Example app listening at 8081");
});

app.get('/todo', async function(req, res) {
   let title = req.query.title;
   let status = req.query.status;
   let createdby = req.query.createdby;
   if(!status || !title){
      res.send("Error Set the correct parameters");
   }
   else{
   console.log(title,status,createdby);
   MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("mydb");
      var myobj = {"title": title, "status":status,"CreatedBy":createdby,"time":Date.now()};
      dbo.collection("tasks").insertOne(myobj, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
      });
      res.end("Inserted:"+title+" "+status);
   });
   
   }
});