const express = require('express');
const router = express.Router();

router.get('/',(req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to /users.'
    })
});

router.post('/',(req, res, next) => {
    const user = {
        name: req.body.name,
        username: req.body.username,
        email: req.body.email
    }
    res.status(200).json({
        message: 'Handling POST requests to /users.',
        createdUser: user
    })
});



module.exports = router;