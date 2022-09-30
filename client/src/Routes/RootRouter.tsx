import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ROUTES } from '../constans/routes'; 
import Home from '../Scenes/Home';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isLoggedIn } from '../store/selectors/userSelectors';
import LoginPage from '../Scenes/LoginPage';

function RootRoute() {

    const userLoggedIn = useSelector(isLoggedIn);
    const renderedForGuest = (scene: JSX.Element) => {
        if(userLoggedIn) {
            return scene;
        }   else {
            return <Navigate to={'/login'}/>
        }
    }
    
    return (
        <Routes>
            <Route path={ROUTES.homePage} element={renderedForGuest(<Home/>)}></Route>
            <Route path={ROUTES.loginPage} element={<LoginPage/>}></Route>
            <Route path='*' element={<Navigate to={ROUTES.homePage}/>}></Route>
        </Routes>
    )
}

export default RootRoute;