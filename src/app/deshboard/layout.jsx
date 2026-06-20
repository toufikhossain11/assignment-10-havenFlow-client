import Sidebar from '@/components/Deshboard/Owner/Sidebar';
import React from 'react';

const DeshbordLayout = ({ children }) => {
    return (
        <div className="flex w-full min-h-screen bg-black">
      <Sidebar /> 
      <div className="flex-1 p-6 overflow-y-auto">
        {children}
      </div>
    </div>
    );
};

export default DeshbordLayout;