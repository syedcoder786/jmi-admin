import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Route, Routes, Navigate, Link } from 'react-router-dom';
import AddNft from '../components/AddNft';
import { useDispatch, useSelector } from 'react-redux'
import { fetchNfts } from '../actions/nftActions'
import { logout } from '../actions/authActions'
import SideBar from '../components/SideBar';

import '../App.css'
import NftBootstrap from '../components/NftBootstrap';
import EditNft from '../components/EditNft';
import NftOwner from '../components/NftOwner';

const DashboardRoutes = (props) => {
  const [newNfts, setNewNfts] = useState([])
  const dispatch = useDispatch()
  const { nfts, nftData } = useSelector(state => state.nft)
  const { user } = useSelector(state => state.auth)

    useEffect(() => {
        dispatch(fetchNfts())
    },[user])

    useEffect(() => {
      setNewNfts(nfts)
    },[nfts])
    
    useEffect(() => {
      if(nftData){
        setNewNfts((nfts) => [nftData, ...nfts])
      }
    },[nftData])

    const sidebar = useRef(null)

    // useEffect(() => {
    //   if(deletedCard){
    //     var newArray = newCards.filter(card => {return card._id !== deletedCard._id});
    //     console.log(newArray)
    //     setNewCards([...newArray])
    //   }
    // },[deletedCard])

      return (
          <div>
            <BrowserRouter>
            <div class="wrapper d-flex align-items-stretch">
              <SideBar sidebar={sidebar}/>
            {/* <Navbar/> */}

            <div id="content" class="p-4 p-md-5">
              <nav class="navbar navbar-expand-lg navbar-light bg-light" >
                <div class="container-fluid">

                  <button type="button" id="sidebarCollapse" 
                      class="btn btn-primary"
                      onClick={() => {
                          if(sidebar.current.className === 'active'){
                              sidebar.current.className = ''
                          }else{
                              sidebar.current.className = 'active'
                          }
                      }}
                  >
                    <i class="fa fa-bars"></i>
                    <span class="sr-only">Toggle Menu</span>
                  </button>
                  <button class="btn btn-dark d-inline-block d-lg-none ml-auto" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                      <i class="fa fa-bars"></i>
                  </button>

                  <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="nav navbar-nav ml-auto">
                      <li class="nav-item active">
                        <Link to='/addnft'><a class="nav-link" href="#">Add Nft</a></Link>
                      </li>
                      {/* <li class="nav-item">
                        <Link to='/nfts'><a class="nav-link" href="#">nfts</a></Link>
                      </li> */}
                      <li class="nav-item">
                        <Link to='/nftbootstrap'><a class="nav-link" href="#">Get Nfts</a></Link>
                      </li>
                      <li class="nav-item">
                        <Link to='/nftowner'><a class="nav-link" href="#">Owner Of Nfts</a></Link>
                      </li>
                      <li class="nav-item">
                        <Link to='/'><a class="nav-link" href="#" onClick={() => dispatch(logout())}>Log Out</a></Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
              {/* <h2 class="mb-4">Sidebar #01</h2> */}
                <Routes>
                  <Route exact path="/" element = {<Navigate to="/addnft" />}/>
                  <Route path="/addnft" element = {<AddNft/>}/>
                  <Route path="/nftbootstrap" element = {<NftBootstrap nfts={newNfts}/>}/>
                  <Route path="/editNft" element = {<EditNft/>}/>
                  <Route path="/nftowner" element = {<NftOwner nfts={newNfts}/>}/>
                  <Route path="/*" element={ <div>404 Error.Page Not found</div> }></Route>
                </Routes>
              </div>
            </div>
            </BrowserRouter>
          </div>         
      )
}

export default DashboardRoutes;
