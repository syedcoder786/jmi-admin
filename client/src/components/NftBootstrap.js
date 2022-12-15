import React from 'react';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';

import ImageLoader from 'react-loading-image'
import { Audio } from  'react-loader-spinner'
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import config from "../config/default.json"

function NftBootstrap(props) {
    const { loading } = useSelector(state => state.nft)
    // const dispatch = useDispatch()

    const allNfts = props.nfts.map(nft => (
        <div class="col-auto mb-3" key={nft.id}>
            <div class="card" style={{width: "18rem"}}>
            {/* <img style={{height: "400px"}} src={card.imageUri?card.imageUri:"card-Airon.jpg"} class="card-img-top" alt="..."/> */}
            <ImageLoader
                style={{height: "250px", width: "100%"}}
                class="card-img-top"
                src={nft.imageUri?config.ipfsGateway+nft.imageUri.slice(7):"logo192.png"}
                loading={() => <div style={{height:"250px", paddingTop:"50%"}}><Audio
                    heigth="500"
                    width="500"
                    color='grey'
                    ariaLabel='loading'
                  /></div>}
                error={() => <h3><center>Error Reload Page</center></h3>}
            />
                <div class="card-body">
                    {/* <h5 class="card-title">{nft.type}-<span style={{color:"#6c757d"}}>{nft.typeName}</span></h5> */}
                    <h6 class="card-subtitle mb-2 text-muted">Name- {nft.name}</h6>
                    <h6 class="card-subtitle mb-2 text-muted">Rarity- {nft.rarity}</h6>
                    <h6 class="card-subtitle mb-2 text-muted">Price- {nft.price}</h6>
                    {nft.isMinted &&
                        <div>
                            <h6 class="card-subtitle mb-2 text-muted">Owner Id- {nft.ownerId}</h6>
                            <h6 class="card-subtitle mb-2 text-muted">Token Id- {nft.tokenId}</h6>
                        </div>
                    }
                    <p class="card-text">{nft.description}</p>
                    {/* <a class="card-link"
                        style={{cursor: "pointer", color:"green"}}
                        onClick={() => {
                            toggle(card.uri, card.code)
                        }}
                    >Mint</a> */}
                    {!nft.isMinted && <a href="" class="card-link"><Link to='/editNft' state={{newNftData:nft}} >Edit</Link></a>}
                </div>
            </div>
        </div>
    ))

    return (
        <div>
            <ToastContainer />
            {/* <Modal isOpen={model} toggle={()=>toggle("")} className="class">
            <ModalHeader toggle={()=>toggle("")}>Enter Amount</ModalHeader>
            <ModalBody>
            <Input type="number" name="text" id="exampleEmail" placeholder="Amount"
                onChange={(e) => setAmountMint(e.target.value)}
            />
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={toggleMint}>Mint</Button>{' '}
                <Button color="secondary" onClick={()=>toggle("")}>Cancel</Button>
            </ModalFooter>
            </Modal> */}

            <center><h1>Nfts</h1></center>
            <div class="container mt-4">
                
                <div class="row">
                    {loading?<div style={{marginLeft: "25%"}}><Audio
                    heigth="500"
                    width="500"
                    color='grey'
                    ariaLabel='loading'
                  /></div>:allNfts.length>0?allNfts:(<h2>No nfts available.</h2>)}
                </div>
            </div>
        </div>
    );
}

export default NftBootstrap;