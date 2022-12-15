const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')

const Nft = require("../../models/Nft")


router.post('/addNft', auth, async (req,res) => {

    const { name, rarity, price, description, imageUri, uri } = req.body
    
    console.log(name)
    console.log(uri)

    const nft = new Nft({
        name,
        rarity,
        price,
        description,
        imageUri,
        uri,
        tokenId:0,
        ownerId:"null",
        ownerAddress:"null",
        isMinted:false,
    })

    try {

        const savedNft = await nft.save()
        res.status(200).json(nft)

    } catch (error) {
        console.log(error)
        res.status(400).json({msg:error})
    }

})

module.exports = router;