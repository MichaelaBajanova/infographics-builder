import React from 'react';

interface IProps {
    name: string,
}

const Icon: React.FC<IProps> = (props) => {

    const {name} = props;

    return (
        <i className="material-icons">{name}</i>
    );
};

export default React.memo(Icon);