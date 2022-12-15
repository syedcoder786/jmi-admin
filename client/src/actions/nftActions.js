import { NFTS_DATA, ADD_NFT, LOADING_NFTS, EDIT_NFT, OWNER_NFTS } from './types';
import axios from "axios"
import { returnErrors } from './errorActions'

import newConfig from "../config/default.json"

import { NFTStorage, File } from 'nft.storage'
const client = new NFTStorage({ token: newConfig.nftToken })

export const fetchNfts = () => (dispatch, getState) => {

    //get token from local storage
    const token = getState().auth.token;

    //headers
    const config = {
        headers:{
            "Content-type":"application/json"
        }
    }
    if(token){
        config.headers['x-auth-token'] = token;
    }

    dispatch({
        type: LOADING_NFTS,
        payload: true
    })

    // console.log(newConfig)
    axios({
        method: 'post',
        url: newConfig.proxy +"/nft/fetchNftsAdmin",
        headers: config.headers
    })
    .then(nfts => {
        dispatch({
            type: LOADING_NFTS,
            payload: false
        })
        dispatch({
            type: NFTS_DATA,
            payload: nfts.data
        }) 
    }).catch(err => {
        console.log(err)
        dispatch(returnErrors(err.response.data, err.response.status,'NFT_FETCH_FAIL'));
    })
}


// export const getLastId = () => (dispatch, getState) => {

//     //get token from local storage
//     const token = getState().auth.token;

//     //headers
//     const config = {
//         headers:{
//             "Content-type":"application/json"
//         }
//     }
//     if(token){
//         config.headers['x-auth-token'] = token;
//     }

//     dispatch({
//         type: LOADING_CARDS,
//         payload: true
//     })

//     axios({
//         method: 'post',
//         url: '/card/getLastId',
//         headers: config.headers
//     })
//     .then(mintId => {
//         dispatch({
//             type: GET_LASTID, // TODO: add in types.js
//             payload: mintId.data
//         })
//     }).catch(err => {
//         dispatch(returnErrors(err.response.data, err.response.status,'GET_ID_FAIL'));
//     })
// }

export const addNft = (formData) => async (dispatch, getState) => {

    console.log("nft here")
    console.log(JSON.parse(formData.get('nft')))

    const { name, rarity, price, description } = JSON.parse(formData.get('nft'))

    const metadata = await client.store({
        name,
        rarity,
        description,
        image: new File(
            [
              /* data */
                formData.get('myImage')
            ],
            `filename.png`,
            { type: `image/png` }  // TODO: extract file extention from file
        )
      })

      console.log(metadata.url)
      console.log(metadata.data.image.href)  

    const sendData = {
        name,
        rarity, 
        price,
        description,
        imageUri:metadata.data.image.href,
        uri:metadata.url,
    }


  //get token from local storage
  const token = getState().auth.token;

  //headers
  const config = {
      headers:{
          "Content-type":"application/json",
          'Content-Type': 'multipart/form-data'
      }
  }
  if(token){
      config.headers['x-auth-token'] = token;
  }
  

    axios({
        method: 'post',
        url: newConfig.proxy +"/nft/addNft",
        data: sendData,
        headers: config.headers
    })
    .then(nftData =>{
        console.log(nftData.data)
        dispatch({
            type: ADD_NFT,
            payload: nftData.data
        })
    }).catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status,'NFT_ADD_FAIL'));
    })
}


export const editNft = (formData) => async (dispatch, getState) => {

    console.log("nft here")
    console.log(JSON.parse(formData.get('nft')))

    const { name, rarity, price, description } = JSON.parse(formData.get('nft'))

    const metadata = await client.store({
        name,
        rarity,
        price,
        description,
        image: new File(
            [
              /* data */
                formData.get('myImage')
            ],
            `filename.png`,
            { type: `image/png` }  // TODO: extract file extention from file
        )
      })

      console.log(JSON.parse(formData.get('nftId')))
      console.log(metadata.url)
      console.log(metadata.data.image.href)  

    const sendData = {
        name, 
        rarity, 
        price,
        description,
        imageUri:metadata.data.image.href,
        uri:metadata.url,
        nftCode: JSON.parse(formData.get('nftId')),
    }


  //get token from local storage
  const token = getState().auth.token;

  //headers
  const config = {
      headers:{
          "Content-type":"application/json",
          'Content-Type': 'multipart/form-data'
      }
  }
  if(token){
      config.headers['x-auth-token'] = token;
  }
  

    axios({
        method: 'post',
        url: newConfig.proxy +"/nft/editNft",
        data: sendData,
        headers: config.headers
    })
    .then(nftData =>{
        console.log(nftData.data)
        dispatch({
            type: EDIT_NFT,
            payload: nftData.data
        })
    }).catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status,'NFT_EDIT_FAIL'));
    })
}


// export const addTokenIds = (mintIds) => (dispatch, getState) => {

//   //get token from local storage
//   const token = getState().auth.token;

//   //headers
//   const config = {
//       headers:{
//           "Content-type":"application/json",
//           'Content-Type': 'multipart/form-data'
//       }
//   }
//   if(token){
//       config.headers['x-auth-token'] = token;
//   }
  

//     axios({
//         method: 'post',
//         url: newConfig.proxy +"/card/addTokenIds",
//         data: mintIds,
//         headers: config.headers
//     })
//     .then(mintData =>{
//         console.log(mintData.data)
//         dispatch({
//             type: ADD_TOKENIDS,
//             payload: mintData.data
//         })
//     }).catch(err => {
//         dispatch(returnErrors(err.response.data, err.response.status, 'MINT_ADD_FAIL'));
//     })
// }


export const fetchOwnerNfts = () => (dispatch, getState) => {

    //get token from local storage
    const token = getState().auth.token;

    //headers
    const config = {
        headers:{
            "Content-type":"application/json"
        }
    }
    if(token){
        config.headers['x-auth-token'] = token;
    }

    dispatch({
        type: LOADING_NFTS,
        payload: true
    })

    // console.log(newConfig)
    axios({
        method: 'post',
        url: newConfig.proxy +"/nft/fetchOwnerNfts",
        headers: config.headers
    })
    .then(nfts => {
        console.log(nfts.data)
        dispatch({
            type: LOADING_NFTS,
            payload: false
        })
        dispatch({
            type: OWNER_NFTS,
            payload: nfts.data
        }) 
    })
}


export const clearAddNft = () => (dispatch) => {
    dispatch({
        type: ADD_NFT,
        payload: null
    })
}