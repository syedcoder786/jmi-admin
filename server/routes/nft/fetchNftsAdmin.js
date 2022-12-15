const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')
const Nft = require("../../models/Nft")

router.post('/fetchNftsAdmin', auth, async (req,res) => {
    
    try {
        const nfts = await Nft.find();
        res.status(200).json(nfts);
    } catch (error) {
        console.log(error)
        res.status(400).json({msg:error})
    }

})

module.exports = router;