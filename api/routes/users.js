const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/users');

router.get('/',(req, res, next) => {
    let dBQuery = User.find();
    if (req.query.username) {
        const uname = req.query.username;
        dBQuery = User.find({username : uname});
    }
    dBQuery
    .exec()
    .then(docs => {
        console.log(docs);
        res.status(200).json(docs);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({"error" : err})
    });
    // res.status(200).json({
    //     message: 'Handling GET requests to /users.'
    // })
});

router.post('/',(req, res, next) => {
    const user = new User({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email
    });
    user.save()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'Handling POST requests to /users.',
                createdUser: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({"error" : err})
        });
    
});

router.get('/:userid',(req, res, next) => {
    const id  =  req.params.userid;
    User.findById(id)
        .exec()
        .then(doc => {
            console.log(doc);
            if(doc){
                res.status(200).json(doc);
            }
            else {
                res.status(404).json({"message" : "User not found"});
            }
            
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({"error" : err})
        });
});

// router.get('/:username',(req, res, next) => {
//     const uname  =  req.params.username;
//     User.find({username : uname})
//         .exec()
//         .then(doc => {
//             console.log(doc);
//             if(doc){
//                 res.status(200).json(doc);
//             }
//             else {
//                 res.status(404).json({"message" : "User not found"});
//             }
            
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json({"error" : err})
//         });
// });



module.exports = router;