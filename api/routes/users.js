const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const Workspace = require("../models/workspace");
const auth = require('../../middleware/auth')
const User = require('../models/users');

router.get('/', auth, (req, res, next) => {
    let dBQuery = User.find();
    if (req.query.username) {
        const uname = req.query.username;
        dBQuery = User.find({username : uname});
    }
    dBQuery
    .select('name username email')
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

router.get('/workspaces', auth, (req, res, next) => {
    let dBQuery = Workspace.find({"users" : req.user_id});
    console.log(dBQuery)
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
    const user = User(req.body)
    user.save()
        .then(result => {
            // console.log(result)
            const token = user.generateAuthToken();
            res.status(201).json({
                message: 'Successfully Created a User',
                createdUser: result,
                Token : token
            });
        })
        .catch(err => {
            console.log(err);
            if (err.name === 'MongoError' && err.code === 11000) {
                return res.status(500).send({ message: Object.keys(err.keyPattern).toString()+' already exists!' });
              }
            res.status(500).json({"error" : err})
        });
    
});

router.get('/:userid', auth, (req, res, next) => {
    const id  =  req.params.userid;
    User.findById(id)
        .select('name username email')
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

router.post('/login', async (req, res) => {
    try {
        //const user = await User.findOne({email:req.body.email})
        //console.log(user);
        //const token = await user.generateAuthToken()
        //res.send({ user, token })
        // res.send(user)
        const i = await User.findOne({email:req.body.email}).exec()
        const istr = await bcrypt.compare(req.body.password,i['password']);
        if(istr){
            const token = await i.generateAuthToken();
            res.send({
                token, 
                user: i
            });
        }
        else{
            res.status(401).send('invalid password')
        }

    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/logout', auth, async (req, res) => {

    try {
        req.user.tokens = req.user.tokens.filter(
            (token) => token.token != req.token
        )
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})


module.exports = router;