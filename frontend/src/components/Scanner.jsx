import React, { useState } from 'react';
import Draggable from 'react-draggable';

const Scanner = () => {
    const [isScanning, setIsScanning] = useState(false);

    const handleStartScan = () => {
        setIsScanning(true);
    };

    const handleStopScan = () => {
        setIsScanning(false);
    };

    return (
        <div className="flex flex-col items-center justify-center p-4 bg-transparent border border-white rounded-lg h-[80vh] shadow-lg" style={{ width: '400px' }}>
            <h2 className="text-lg font-bold text-white mb-2">Escáner</h2>
            {isScanning ? (
                <div className="flex-1 overflow-hidden border-2 border-transparent rounded-lg w-full" style={{ height: '300px' }}>
                    <iframe
                        src="https://demo.roboflow.com/e-waste-ojvb8/3?publishable_key=rf_Y6BRAaoFdRgZo7n3AgwGA4oMYaa2" // Cambia esta URL por la que desees mostrar
                        title="Escáner"
                        className="w-full h-full" // Ajusta el iframe al tamaño del contenedor
                        frameBorder="0"
                        allow="camera; microphone" // Permite el acceso a la cámara y el micrófono
                    ></iframe>
                </div>
            ) : (
                <div className="border-2 border-transparent rounded-lg w-full h-24 flex items-center justify-center">
                    <p className="text-gray-400">Presiona el botón para iniciar el escaneo.</p>
                </div>
            )}
            {isScanning ? (
                <button
                    onClick={handleStopScan}
                    className="mt-2 bg-transparent text-white p-2 rounded-lg text-sm hover:bg-gray-800 transition duration-200"
                >
                    Detener Escaneo
                </button>
            ) : (
                <button
                    onClick={handleStartScan}
                    className="mt-2 bg-transparent text-white p-2 rounded-lg text-sm hover:bg-gray-800 transition duration-200"
                >
                    Iniciar Escaneo
                </button>
            )}
        </div>
    );
};

export default Scanner;
