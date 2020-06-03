const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')


mongoose.connect('mongodb+srv://user:mongopassword@cluster0-d2zjl.mongodb.net/mydb?retryWrites=true&w=majority',{ useNewUrlParser: true,useUnifiedTopology: true })

const userRoutes = require('./routes/users');
const taskroute = require('./routes/tasks')

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/users',userRoutes);
app.use('/task',taskroute);




app.get('/',(req,res)=>{
    res.send('goto: <br /> /task for task <br /> /users for users')
})



app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status= 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message : error.message
        }
    });
});


module.exports = app;
