import React from 'react';
import '../styles/Header.scss';
import User from "./User";

const Header: React.FC = () => {

    return (
        <header className="header">
            <User/>
        </header>
    );
};

export default React.memo(Header);