const express = require('express');
const router = express.Router();
const config = require('config');
const auth = require('../../middleware/auth')

const realId = config.get('id')
const realEmail = config.get('email')
// const realPassword = config.get('password')

router.get('/admin', auth, (req,res) => {    
    if(req.user.id === realId){
        res.json({
            id: realId,
            email: realEmail,
        })
    }
})

module.exports = router;