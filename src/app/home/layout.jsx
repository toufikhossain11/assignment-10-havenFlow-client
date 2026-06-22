import Footer from '@/components/Footer';
import AppNavbar from '@/components/Navbar';
import React from 'react';

const homeLayout = ({ children }) => {
    return (
        <div>
            <AppNavbar/>
            <main>{children}</main>
            <Footer/>
        </div>
    );
};

export default homeLayout;