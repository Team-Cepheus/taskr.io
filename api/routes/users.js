const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const auth = require('../../middleware/auth')
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
    const user = User(req.body)
    user.save()
        .then(result => {
            res.status(201).json({
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
            res.send({token});
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