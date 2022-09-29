import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ROUTES } from '../constans/routes';
import MainLayout from '../Layouts/MainLayout/MainLayout';
import WebSock from '../Scenes/WebSock';

function RootRoute() {
    return (
        <Routes>
            <Route key={'home'} path={ROUTES.homePage} element={<WebSock/>}></Route>
            <Route path='*' element={<h2 className='erorr--not-found'>Ресурс не найден!</h2>}></Route>
        </Routes>
    )
}

export default RootRoute;