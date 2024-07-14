import React from 'react';
import Image from 'next/image';
import Logo from '../../../../public/images/Aerchain.png';
import { HeaderLayout } from './style.js';

const Header = () => {
    return (
        <HeaderLayout>
            <div className='header-container'>
        <Image 
             src={Logo}
             alt="Example Image" 
        />
        <div>Module</div>
        <div>Purchase Order</div>
        <div>Invoice</div>
        <div>Budget</div>
        </div>
        </HeaderLayout>
    )
};

export default Header;