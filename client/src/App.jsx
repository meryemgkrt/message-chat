import React from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster, toast } from "react-hot-toast";

const App = () => {
  return (
    <> 
       <Toaster/>
        <main >
         <Outlet/>
        </main>
    </>
  );
};

export default App;
