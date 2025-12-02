import React from 'react';
import { Link } from 'react-router-dom';

const Copyright = () => {
    return (
        <div className="text-center py-4 bg-slate-200 text-[10px] md:text-xs 2xl:text-sm rounded-sm">
            Copyright © 2025 Remos • Designed By 
            <Link to={"https://avi-debnath.surge.sh/"} target='_blank' className='ml-2 text-blue-700 hover:underline'>Avi Debnath</Link>
        </div>
    );
};

export default Copyright;