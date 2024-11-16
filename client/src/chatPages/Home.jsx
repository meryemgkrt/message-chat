import axios from 'axios';
import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const Home = () => {
  const fetchUser = async () => {
    try {
      const URL = `${import.meta.env.VITE_BACKEND_URL}/api/user-details`; // "/api/user-details"
  
      console.log(import.meta.env.VITE_BACKEND_URL);
  
      const response = await fetch(URL, {
        method: "GET",
        credentials: "include",
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const res = await response.json();
      console.log("res", res);
  
    } catch (error) {
      console.error("error", error);
    }
  };
  
  

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      home
      <section>
        <Outlet />
      </section>
    </div>
  );
}

export default Home;
