import React from 'react';
import Chat from './Chatbot'; // Asegúrate de que la ruta sea correcta

const ScreenOne = () => {
    return (
        <div className="flex-1 h-[450px] w-7/10 mr-5 bg-[rgba(255,255,255,0.2)] border border-white rounded-lg shadow-lg"> {/* Fondo difuminado al 20% y margen derecho de 20px */}
            <Chat className="h-full w-full" /> {/* Asegúrate de que Chat ocupe todo el espacio */}
        </div>
    );
};

export default ScreenOne;
