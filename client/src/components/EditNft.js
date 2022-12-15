import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editNft } from '../actions/nftActions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router-dom'
import { clearErrors } from '../actions/errorActions';

function EditNft(props) {
    const dispatch = useDispatch()
    const { editData } = useSelector((state) => state.nft)
    const { msg } = useSelector((state) => state.error)

    const [errmsg, setErrmsg] = useState('')
    const [uploadmsg, setUploadmsg] = useState('')
    // useEffect(() => {
    //     dispatch(logout())
    // },[])

    useEffect(() => {
        if(editData){
            console.log(editData)
            setUploadmsg(null)
            toast.success("Nft Edited! Redirecting...")
            setTimeout(() => {
                window.location.assign('/nftbootstrap')
            },2500)
            // dispatch(clearEditedit())
        }
    },[editData])

    const {pathname, state} = useLocation()

    useEffect(() => {
          console.log(`You changed the page to: ${pathname}`) 
        //   alert("changing")
        window.scrollTo(0, 0)
        if(!state){
            alert("Not allowed.")
            console.log("redirect")
        }
        const { newNftData } = state; 
        console.log(newNftData)

        setName(newNftData.name)
        setRarity(newNftData.rarity)
        setPrice(newNftData.price)
        setDescription(newNftData.description)
        setMyImageURL(newNftData.imageUri)

        // dispatch(getNft({ NftCode }))
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
    const [rarity, setRarity] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [myImage, setMyImage] = useState('')
    const [myImageURL, setMyImageURL] = useState('')

    const onSubmit = (e) => {
        e.preventDefault();
        setErrmsg('')
        window.scrollTo(0, 0)
        console.log(name)
        // if(!name || !level || !subType || !code || !amount || !rarity || !type || !typeName || !description){
        if(!name ||!rarity || !price || !description){
            setErrmsg('Please enter all fields.')
        }else if(rarity === 'Choose...'){
            setErrmsg('Choose Rarity')
        }else if(!myImage){
            setErrmsg('Upload Image again to verify.')
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
            const { newNftData } = state;
            formData.append('nftId', JSON.stringify(newNftData._id))
            setUploadmsg("Uploading...")
            dispatch(editNft(formData))
            // e.target.reset();
            // setName('')
            // setLevel('')
            // setSubType('')
            // setCode('')
            // setRarity('')
            // setType('')
            // setTypeName('')
            // setDescription('')
            // setMyImage('')
            // setMyImageURL('')
            
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
                <h2>Edit Nft</h2>
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


            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <label class="input-group-text" for="inputGroupSelect01">Name</label>
                </div>
                {/* <label for="staticEmail" class="col-sm-2 col-form-label">Name</label> */}
                <div class="col-sm-10">
                <input 
                    type="text" 
                    class="form-control" 
                    id="formGroupExampleInput" 
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                </div>
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
                value={rarity}
            >
                <option selected>Choose...</option>
                <option value="Common">Common</option>
                <option value="Rare">Rare</option>
                <option value="Rare">Epic</option>
                <option value="Rare">Legendary</option>
            </select>
            </div>
            
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <label class="input-group-text" for="inputGroupSelect01">Description</label>
                </div>
                <div class="col-sm-10">
                <textarea class="form-control" id="exampleFormControlTextarea1" 
                    rows="3"
                    placeholder='Description'
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                ></textarea>
                </div>
            </div>
            <button 
                type="submit" 
                class="btn btn-primary"
            >Edit Nft</button>
            </form>
            </center>
            <br/><br/>
        </div>
    );
}

export default EditNft;