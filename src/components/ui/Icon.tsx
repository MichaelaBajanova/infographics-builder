import React from 'react';

interface IProps {
    name: string,
    type: string,
}

const Icon: React.FC<IProps> = (props) => {

    const {name, type} = props;

    return (
        <i className={`icon ${type} fa-${name}`} />
    );
};

export default React.memo(Icon);
