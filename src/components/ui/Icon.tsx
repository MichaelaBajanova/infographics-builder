import React from 'react';

interface IProps {
    name: string,
    type: string,
    size?: string,
}

const Icon: React.FC<IProps> = (props) => {

    const {name, type, size} = props;

    return (
        <i className={`icon ${type} fa-${name} ${size ? `fa-${size}` : ''}`} />
    );
};

export default React.memo(Icon);
