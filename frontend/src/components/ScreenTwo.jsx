import React from 'react';

const ScreenTwo = () => {
    return (
        <div className="h-screen">
            <iframe
                src="https://www.examle.com" // Cambia esta URL por la que desees mostrar
                title="Screen Two"
                className="w-full h-full"
                frameBorder="0"
            ></iframe>
        </div>
    );
};

export default ScreenTwo;
