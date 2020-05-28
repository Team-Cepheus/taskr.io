var express = require('express');
var app = express();
var ObjectId = require('mongodb').ObjectId;
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

//======================================================
// Get The Tasks
app.get('/getTask',function(req,res){
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

//========================================================
//Insert TO_DO
app.get('/insertTask', async function(req, res) {
   // Add other Parameters here
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
      var dbo = db.db("mydb"); //DB
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

//========================================================
// Delete Task
app.get('/deleteTask', async function(req, res) {
   if(!req.query.id){
      res.end("Wrong ID");
   }
   else{
   MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("mydb");
      var myquery = {"_id":ObjectId(req.query.id)};
      dbo.collection("tasks").deleteOne(myquery, function(err, obj) {
        if (err) throw err;
        console.log(dbo.collection('tasks').findOne(req.query.url));
        res.end("1 document deleted");
        db.close();
      });
   });}
});

//========================================================
// Serve 
var server = app.listen(8081, function () {
   console.log("Example app listening at 8081");
});