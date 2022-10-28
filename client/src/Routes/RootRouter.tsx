import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { ROUTES } from '../constans/routes'; 
import { useSelector } from 'react-redux';
import { isLoggedIn } from '../store/selectors/userSelectors';
import MainLayout from '../Layouts/MainLayout';
import LoginPage from '../Scenes/LoginPage';
import Home from '../Scenes/Home';
import Chat from '../Scenes/Chat';
import Users from '../Scenes/Users';
import Achives from '../Scenes/Achives';
import Support from '../Scenes/Support'; 
import SupportSubmit from '../Scenes/SupportSubmit';
import UserProfileViewing from '../Scenes/UserProfileViewing';

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
            <Route path={ROUTES.homePage} element={renderedForGuest(<MainLayout/>)}>
                <Route path={ROUTES.homePage} element={<Home/>}></Route>
            </Route>
            <Route path={ROUTES.chat} element={renderedForGuest(<MainLayout/>)}>
                <Route path={ROUTES.chat} element={<Chat/>}></Route>
            </Route>
            <Route path={ROUTES.users} element={renderedForGuest(<MainLayout/>)}>
                <Route path={ROUTES.users} element={<Users/>}></Route>
            </Route>
            <Route path={ROUTES.achives} element={renderedForGuest(<MainLayout/>)}>
                <Route path={ROUTES.achives} element={<Achives/>}></Route>
            </Route>
            <Route path={ROUTES.support} element={renderedForGuest(<MainLayout/>)}>
                <Route path={ROUTES.support} element={<Support/>}></Route>
            </Route>
            <Route path={ROUTES.userProfileId} element={renderedForGuest(<MainLayout/>)}>
                <Route path={ROUTES.userProfileId} element={<UserProfileViewing/>}></Route>
            </Route>
            <Route path={ROUTES.supportSubmit} element={<SupportSubmit/>}></Route>
            <Route path={ROUTES.loginPage} element={<LoginPage/>}></Route>
            <Route path='*' element={<Navigate to={ROUTES.homePage}/>}></Route>
        </Routes>
    )
}

export default RootRoute;