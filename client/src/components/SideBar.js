import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../actions/authActions'

const SideBar = ({ sidebar }) => {
	const [address, setAddress] = useState(null)
	useEffect(() => {
		// const accounts = await window.ethereum.request({ method: 'eth_accounts' })
		// console.log(accounts[0])
		// setAddress(accounts[0]);
		getAddress()
	},[])

	const getAddress = async () => {
		const accounts = await window.ethereum.request({ method: 'eth_accounts' })
		// console.log(accounts[0])
		setAddress(accounts[0]);
	}
    const dispatch = useDispatch()
    return(
			<nav id="sidebar" ref={sidebar} className="">
			<div class="p-4 pt-5" id="fixedOne" style={{position:"fixed"}}>
		  		<a href="#" class="img logo rounded-circle mb-5"
                   style={{backgroundImage:  `url("jmilogo.png")`}}
                ></a>
	        <ul class="list-unstyled components mb-8">
            {/* <li class="active">
	            <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">Home</a>
	            <ul class="collapse list-unstyled" id="homeSubmenu">
                <li>
                    <a href="#">Home 1</a>
                </li>
                <li>
                    <a href="#">Home 2</a>
                </li>
                <li>
                    <a href="#">Home 3</a>
                </li>
	            </ul>
	          </li> */}
			  <li>
			  	{/* <button type="button" class="btn btn-primary btn-lg">Connect Wallet</button> */}
				  <center><button class="btn btn-primary" 
				  	style={{marginBottom:"10px"}}
					  onClick={async () => { 
						if(window.ethereum){
							await window.ethereum.request({
								method: 'eth_requestAccounts',
							});
							getAddress()
						}
					   }}
					>{address?`${address.substr(0,6)}....${address.substr(-4)}`:"Connect Wallet"}</button></center>
                {/* <Link to='/addcard'>Add Card</Link> */}
	          </li>
	          <li>
                <Link to='/addnft'>Add Nft</Link>
	          </li>
			  <li>
                <Link to='/nftbootstrap'>Get Nfts</Link>
	          </li>
	          <li>
                <Link to='/nftowner'>Owner Of Nfts</Link>
	          </li>
	          <li>
                <Link to='/' onClick={() => dispatch(logout())}>Log Out</Link>
	          </li>
	        </ul>

	        <div class="footer">
	        	<p>
                    Copyright © {new Date().getFullYear()} JamiaBook. All rights reserved.
					{/* Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved | This template is made with <i class="icon-heart" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank">Colorlib.com</a> */}
				</p>
	        </div>

	      </div>
    	</nav>

    )
}

export default SideBar;