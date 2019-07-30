import React from 'react';
import '../styles/Header.scss';

class Header extends React.Component {

    render() {
        return (
            <header className="header">
                <User></User>
            </header>
        )
    }
}

class User extends React.Component {

    render() {
        return (
            <div className="header__user">
                <div className="header__user-photo-wrapper">
                    <img className="header__user-photo" src={require('../images/puppy.jpg')} alt="User"/>
                </div>
                <div className="header__user-name">John Doe</div>
            </div>
        );
    }
}

export default Header;