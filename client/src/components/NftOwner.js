import GridTable from '@nadavshaar/react-grid-table';
import { useEffect, useState } from 'react';
import config from "../config/default.json"

function NftOwner(props) {

    const Username = ({ value, data, }) => {
        return (
            <div className='rgt-cell-inner' style={{display: 'flex', alignItems: 'center', overflow: 'hidden'}}>
                <img src={config.ipfsGateway+data.imageUri.slice(7)} alt="user avatar" style={{width:"30%", borderRadius: "10%"}} />
                <span className='rgt-text-truncate' style={{marginLeft: 10}}>{value}</span>
            </div>
        )
    }

    const [rows, setRows] = useState([])

    useEffect(() => {
        setRows(props.nfts)
    },[props.nfts])
    
    const columns = [
        {
            id: 1, 
            field: 'name', 
            label: 'Name',
            cellRenderer: Username,
        }, 
        {
            id: 2, 
            field: 'ownerId', 
            label: 'ownerId',
        },
        {
            id: 3, 
            field: 'tokenId', 
            label: 'Token Id',
            // sort: ({a, b, isAscending}) => {
            //     let aa = a.split('/').reverse().join(),
            //     bb = b.split('/').reverse().join();
            //     return aa < bb ? isAscending ? -1 : 1 : (aa > bb ? isAscending ? 1 : -1 : 0);
            // }
        },
        {
            id: 4, 
            field: 'ownerAddress', 
            label: 'Owner Address',
            // getValue: ({value, column}) => value.x + value.y
        },
        {
            id: 5, 
            field: 'isMinted', 
            label: 'Minted',
            // getValue: ({value, column}) => value.x + value.y
        },
    ];
    
    return (
        <div>
            <GridTable columns={columns} rows={rows} />
        </div>
    )
}

export default NftOwner;