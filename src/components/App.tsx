import React from 'react';
import Header from './Header';
import '../styles/App.scss';
import Content from "./Content";

const App = () => {
    return (
        <div className="app">
            <Header/>
            <Content/>
        </div>
    );
}

export default App;
