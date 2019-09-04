import React from 'react';
import '../styles/Header.scss';
import User from './User';

const Header: React.FC = () => {

    return (
        <div className="scope__Header">
            <header className="header">
                <User/>
            </header>
        </div>
    );
};

export default React.memo(Header);