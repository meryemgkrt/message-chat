import React from 'react';
import logo from '../img/lg1.webp';

const AuthLayouts = ({ children }) => {
  return (
    <>
      <header className="sticky top-0 z-50 flex items-center justify-center py-3 shadow-md h-30 bg-purple-200">
        <div className="flex justify-center items-center gap-2">
          <img src={logo} alt="logo" className="object-center " width={60} height={50} />
          <h1 className='font-bold text-xl text-purple-800'>CHAT-APP</h1>
        </div>
      </header>
      {children}
    </>
  );
}

export default AuthLayouts;
