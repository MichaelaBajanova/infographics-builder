import React from 'react';
import '../styles/Header.scss';
import User from "./User";

class Header extends React.Component {

    render = () => {
        return (
            <header className="header">
                <User/>
            </header>
        )
    }
}

export default Header;