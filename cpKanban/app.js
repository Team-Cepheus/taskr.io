const express=require('express');
const app=express();
const bodyParser = require("body-parser");
const morgan=require('morgan');
const mongoose=require('mongoose');

mongoose.connect('mongodb+srv://user:mongopassword@cluster0-d2zjl.mongodb.net/workS?retryWrites=true&w=majority',{ useMongoClient: true,useNewUrlParser: true,useUnifiedTopology: true })
const workspaceRoutes = require('./api/routes/workspace');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/workspace',workspaceRoutes);


app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});


module.exports=app;


