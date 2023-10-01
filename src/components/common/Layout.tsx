import React from 'react';
import Sidebar from './Sidebar';

type props = {
  children: React.ReactNode;
};

const Layout = ({ children }: props) => {
  return (
    <div className='flex flex-auto bg-gray-100'>
      <Sidebar />
      <div className='grow'>
        <div className='m-5'>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
