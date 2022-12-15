const express = require('express');
const path = require('path')
const cors = require('cors');
const mongoose = require("mongoose")
const app = express();
const config = require("config")

//bodyParser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //helps in console.log(Object)
//Cors middleware
app.use(cors());


//Mongoose Connection
// mongoose
//     .connect(config.get("mongoURI"),{ useNewUrlParser: true ,useCreateIndex:true, useUnifiedTopology: true})
//     .then( console.log('Connected to Mongoose') )
//     .catch(err=> console.log(err))


(async () => {
    try {
        await mongoose.connect(config.get("mongoURI"),{ useNewUrlParser: true, useUnifiedTopology: true})
        console.log('Connected to Mongoose')
    } catch (err) {
        console.log('error: ' + err)
    }
})()


const {
    admin,
    login
  } = require("./routes/auth");

const {
    addNft,
    fetchNftsAdmin,
    editNft,
    // fetchOwnerNfts,
} = require("./routes/nft");

// //routes
//admin
app.use('/auth',admin);
app.use('/auth',login);

//admin
app.use('/nft',addNft);
app.use('/nft',fetchNftsAdmin);
app.use('/nft',editNft);
// app.use('/nft',fetchOwnerNfts);



//Serve static asserts if in production
if(process.env.NODE_ENV === 'production'){
    //Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}


const port = process.env.PORT || 5000 ;
app.listen(port, ()=> console.log(`server running on port ${port}`));