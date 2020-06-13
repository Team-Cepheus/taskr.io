const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const taskroute = require('./api/routes/tasks')

mongoose.connect('mongodb+srv://user:mongopassword@cluster0-d2zjl.mongodb.net/mydb?retryWrites=true&w=majority',{ useNewUrlParser: true,useUnifiedTopology: true })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/task',taskroute);
//use task route

console.log('Server Running');
app.listen(3001)


