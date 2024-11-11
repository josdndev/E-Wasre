import React, { useState } from 'react';
import Header from './components/Header';
import ScreenOne from './components/ScreenOne';
import ScreenTwo from './components/ScreenTwo';
import Scanner from './components/Scanner';

import './App.css';

function App() {
    const [currentScreen, setCurrentScreen] = useState('screenOne');

    const renderScreen = () => {
        switch (currentScreen) {
            case 'screenOne':
                return <ScreenOne />;
            case 'screenTwo':
                return <ScreenTwo />;
            default:
                return <ScreenOne />;
        }
    };

    return (
        <div>
            <Header setCurrentScreen={setCurrentScreen} />
           
            <main className="flex pt-16 h-full">
                <div className="flex-1 w-7/10">
                    {renderScreen()}
                </div>
                <div className="w-3/10 flex items-center justify-center">
                    <Scanner />
                </div>
            </main>
        </div>
    );
}

export default App;
