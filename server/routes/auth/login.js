const express = require('express');
const router = express.Router();
const config = require('config');
const jwt = require('jsonwebtoken');
// const auth = require('../../middleware/auth')

const realId = config.get('id')
const realEmail = config.get('email')
const realPassword = config.get('password')

router.post('/login', (req,res) => {
    const { email, password } = req.body;
    if(email !== realEmail || password !== realPassword){
        return res.status(400).json({msg:'Invalid credentials'});
    }

    jwt.sign(
        {id: realId},
        config.get('jwtSecret'),
        // {expiresIn: '5m'},
        (err, token) => {
            if(err) throw err;

                res.json({
                token,
                user: {
                    id: realId,
                    email: realEmail,
                }
            })
        }
    )

})

module.exports = router;