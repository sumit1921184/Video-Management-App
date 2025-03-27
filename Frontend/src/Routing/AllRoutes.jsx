import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Components/Home'
import Login from "../Components/Login";
import Register from "../Components/Register";
import PrivateRouting from './PrivateRouting';
import CreateVideoPage from '../Pages/CreateVideo';
import Video from '../Pages/Video';

function AllRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/video" element={<PrivateRouting>{<Video/>} </PrivateRouting>}/>
            <Route path="/createVideo" element={<PrivateRouting>{<CreateVideoPage/>}</PrivateRouting>} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Register />} />
        </Routes>
    )
}

export default AllRoutes;