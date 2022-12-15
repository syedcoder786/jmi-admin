import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNft, clearAddNft } from '../actions/nftActions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router-dom'
import { clearErrors } from '../actions/errorActions';

function AddNft(props) {
    const dispatch = useDispatch()
    const { nftData } = useSelector((state) => state.nft)
    const { msg } = useSelector((state) => state.error)

    const [errmsg, setErrmsg] = useState('')
    const [uploadmsg, setUploadmsg] = useState('')
    // useEffect(() => {
    //     dispatch(logout())
    // },[])
    useEffect(() => {
        if(nftData){
            console.log(nftData)
            setUploadmsg(null)
            toast.success("Nft Added!")
            dispatch(clearAddNft())
        }
    },[nftData])

    const {pathname} = useLocation() 

    useEffect(() => {
          console.log(`You changed the page to: ${pathname}`) 
        //   alert("changing")
          dispatch(clearErrors())
          setUploadmsg(null)
    },[pathname]) 

    useEffect(() => {
        if(msg){
            setErrmsg(msg.msg)
            setUploadmsg(null)
        }else{
            setErrmsg('')
        }
    },[msg])

    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [rarity, setRarity] = useState('')
    const [description, setDescription] = useState('')
    const [myImage, setMyImage] = useState('')
    const [myImageURL, setMyImageURL] = useState('')

    const onSubmit = (e) => {
        e.preventDefault();
        setErrmsg('')
        window.scrollTo(0, 0)
        console.log(name)
        console.log(rarity)
        // if(!name || !level || !subType || !code || !amount || !rarity || !type || !typeName || !description){
        if(!name|| !rarity || !price || !description){
            setErrmsg('Please enter all fields.')
        }else if(rarity === 'Choose...'){
            setErrmsg('Choose Rarity')
        }else if(!myImage){
            setErrmsg('Upload Image.')
        }else{

            const nft = {
                name,
                rarity,
                price,
                description,
            }

            const formData = new FormData();
            formData.append('myImage', myImage);
            formData.append('nft', JSON.stringify(nft))
            setUploadmsg("Uploading...")
            dispatch(addNft(formData))
            e.target.reset();
            setName('')
            setPrice('')
            setRarity('')
            setDescription('')
            setMyImage('')
            setMyImageURL('')
            
        }
    }

    const onChange = (e) => {

        const newImage = e.target.files[0]
        console.log(newImage)
        setMyImage(newImage)
        setMyImageURL(URL.createObjectURL(newImage)) 

    }
    return (
        <div>
            <ToastContainer />
            <center>
                <h2>Add Nft</h2>
            <form style={{width:"80%"}} onSubmit={onSubmit}>
                {errmsg &&
                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                        {errmsg}
                        <button 
                            type="button" 
                            className="close" 
                            data-dismiss="alert" 
                            aria-label="Close"
                            onClick={() => setErrmsg(null)}
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                }

                {uploadmsg &&
                    <div class="alert alert-warning alert-dismissible fade show" role="alert">
                        {uploadmsg}
                        <button type="button" class="close" data-dismiss="alert" 
                            aria-label="Close"
                            onClick={() => setUploadmsg(null)}
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                }


            <div class="col-md-3">
                <div class="text-center">
                <img 
                    src={myImageURL?myImageURL:'Upload.png'} 
                    class="avatar img-circle " 
                    alt="avatar"
                    style={{width: "100%"}}
                    />
                <h6>{"Upload a new photo..."}</h6>
                    <input type="file" class="form-control" 
                        // style={{width:"85%", marginLeft:"30px"}}
                        onChange={onChange}
                        accept=".jpg, .png, .jpeg|image/*"
                    />
                </div>
            </div>
            <br/>

            <div class="form-group">
                <input 
                    type="text" 
                    class="form-control" 
                    id="formGroupExampleInput" 
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div class="input-group mb-3">
            <div class="input-group-prepend">
                <label class="input-group-text" for="inputGroupSelect01">Rarity</label>
            </div>
            <select class="custom-select" 
                id="inputGroupSelect01"
                onChange={(e) => {
                    setRarity(e.target.value)
                    console.log(e.target.value)
                }}
            >
                <option selected>Choose...</option>
                <option value="Common">Common</option>
                <option value="Rare">Rare</option>
                <option value="Rare">Epic</option>
                <option value="Rare">Legendary</option>
            </select>
            </div>

            <div class="form-group">
                <input 
                    type="number" 
                    class="form-control" 
                    id="formGroupExampleInput" 
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
            </div>

            <div class="form-group">
                <textarea class="form-control" id="exampleFormControlTextarea1" 
                    rows="3"
                    placeholder='Description'
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>
            </div>
            <button 
                type="submit" 
                class="btn btn-primary"
            >Add Nft</button>
            </form>
            </center>
            <br/><br/>
        </div>
    );
}

export default AddNft;