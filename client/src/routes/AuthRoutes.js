import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from '../components/Login';

const AuthRoutes = () => {
    return (
        <div>
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element = {<Login/>}/>
                <Route exact path="*" element = {<Navigate to="/"/>}/>
            </Routes>
        </BrowserRouter>
        </div>         
    )
}

export default AuthRoutes;
