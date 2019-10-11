import React from 'react';
import Header from './Header';
import '../styles/App.scss';
import AppWrapper from "./AppWrapper";

const App = () => {
    return (
        <div className="app">
            <Header/>
            <AppWrapper/>
        </div>
    );
}

export default App;
