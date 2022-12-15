import { NFTS_DATA, ADD_NFT, LOADING_NFTS, DELETE_NFT, EDIT_NFT, OWNER_NFTS } from '../actions/types';

const initialState={
    nftData: null,
    nfts: [],
    loading: null,
    deletedNft: null,
    editData: null,
    ownerNfts: [],
}

export default function(state=initialState,action){
    switch(action.type){
        case NFTS_DATA:
        return{
            ...state,
            nfts:action.payload,
        }
        case ADD_NFT:
            return{
                ...state,
                nftData:action.payload,
            }
        case DELETE_NFT:
            return{
                ...state,
                deletedNft:action.payload,
            }
        case LOADING_NFTS:
            return{
                ...state,
                loading:action.payload,
            }
        case EDIT_NFT:
            return{
                ...state,
                editData:action.payload,
            }
        case OWNER_NFTS:
            return{
                ...state,
                ownerNfts:action.payload,
            }
        default:
            return state;
    };
}