import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css';
import '../App.css'
import { Link } from 'react-router-dom';
import { logout } from '../actions/authActions'
import { useDispatch } from 'react-redux'

function Navbar(props) {
  const dispatch = useDispatch()
    return (

        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        
          <a class="navbar-brand" style={{color:"white"}}>Navbar</a>
        
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#basicExampleNav"
            aria-controls="basicExampleNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
        
          <div class="collapse navbar-collapse" id="basicExampleNav">
        
            <ul class="navbar-nav mr-auto">
              <li class="nav-item">   {/* write active for active */}
                
              <Link to='/addnft'><a class="nav-link">AddNft</a></Link>
                  {/* <span class="sr-only">(current)</span> */}
              </li>
              <li class="nav-item">
                <Link to='/nfts'><a class="nav-link">Nfts</a></Link>
              </li>
              <li class="nav-item">
                <Link to='/'><a class="nav-link" onClick={() => dispatch(logout())}>Logout</a></Link>
              </li>
        
            </ul>
        
            <form class="form-inline" onSubmit={(e) => e.preventDefault()}>
              <div class="md-form my-0">
                <input class="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search"/>
              </div>
            </form>
          </div>
        
        </nav>
    );
}

export default Navbar;