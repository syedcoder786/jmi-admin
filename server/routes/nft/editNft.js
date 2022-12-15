const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')
const Nft = require("../../models/Nft")


router.post('/editNft', auth, async (req,res) => {

    const { name, rarity, price, description, imageUri, uri, nftCode } = req.body


    try {

        const nft = await Nft.findOneAndUpdate({ _id:nftCode }, {$set:{name, rarity, price, description, imageUri, uri}})
        res.status(200).json(nft)

    } catch (error) {
        console.log(error)
        res.status(400).json({msg:error})
    }

})

module.exports = router;