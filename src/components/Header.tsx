import React from 'react';
import '../styles/Header.scss';

class Header extends React.Component {

    render = () => {
        return (
            <header className="header">
                <User/>
            </header>
        )
    }
}

class User extends React.Component {

    render = () => {
        return (
            <div className="user">
                <div className="user__photo-wrapper">
                    <img className="user__photo" src={require('../images/puppy.jpg')} alt="User"/>
                </div>
                <div className="user__name">John Doe</div>
            </div>
        );
    }
}

export default Header;