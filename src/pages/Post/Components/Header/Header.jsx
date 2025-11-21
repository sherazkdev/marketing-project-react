import React from 'react';
import { ChevronRightIcon } from '../../../../assets/svgs/Icons';

// Logo
import { OLX_LOGO } from '../../../../assets/svgs/Icons';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className='flex gap-5 !px-4 !py-2 bg-[#f7f8f8] shadow-[0_1px_4px_0_rgba(0,0,0,0.1)]'>
            <button className='rotate-180'><ChevronRightIcon className="!w-6 !h-4"/></button>
            <Link to={`/`}><OLX_LOGO className="w-12 h-12"/></Link>
        </header>
    );
}

export default Header;
