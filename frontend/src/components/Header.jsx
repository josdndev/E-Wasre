import React from 'react';

const Header = () => {
    return (
        <header className="flex items-center mb-[-30px] justify-between p-4 bg-transparent border-b border-white">
            <h1 className="text-white text-2xl">AIHACK</h1>
            <h2 className='text-xl text-white'>E-Waste</h2>
            <nav>
                <ul className="flex space-x-4">
                    <li><a href="#" className="text-white hover:text-gray-400">Inicio</a></li>
                    <li><a href="#" className="text-white hover:text-gray-400">Acerca de</a></li>
                    <li><a href="#" className="text-white hover:text-gray-400">Contacto</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;