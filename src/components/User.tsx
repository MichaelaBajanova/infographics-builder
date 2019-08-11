import React from "react";
import '../styles/User.scss';

const User: React.FC = () => {

    return (
        <div className="user">
            <div className="user__photo-wrapper">
                <img className="user__photo" src={require('../images/puppy.jpg')} alt="User"/>
            </div>
            <div className="user__name">John Doe</div>
        </div>
    );
};

export default User;