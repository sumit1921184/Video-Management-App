import React, { useState, useEffect } from "react";
import home from "../assets/Home.webp";


const Home = () => {
 

  return (
    <div>
      <div
        className="relative flex items-center justify-center h-[100vh] bg-cover bg-center"
        style={{
          backgroundImage: `url(${home})`,
        }}
      >
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
        <div className="relative text-center">
          <p className="text-xl font-bold text-gray-200 mb-2">Welcome to</p>
          <p className="text-5xl font-extrabold text-white">VideoZilla</p>
        </div>
      </div>
      
    </div>
  );
};

export default Home;
