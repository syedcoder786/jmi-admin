import React from 'react';
import AuthRoutes from './AuthRoutes';
import DashboardRoutes from './DashboardRoutes'
import { useSelector } from 'react-redux'


const Routes = (props) => {
    const { token } = useSelector((state) => state.auth)
    const { ethereum } = window;


    if(ethereum){
        if(token){
            return(
                <DashboardRoutes/>
            )
        }else{
            return(
                <AuthRoutes/>
            )
        }
    }else{
        return(
            <div>
                <center>
                    <h1>Wallet Not Installed</h1>
                    <a href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en" style={{ fontSize:"20px" }}>Install Wallet</a>
                </center>
            </div>
        )
    }
}

export default Routes;
