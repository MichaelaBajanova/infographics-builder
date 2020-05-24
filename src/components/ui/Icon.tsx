import React from 'react'

interface IProps {
    name: string,
    type: string,
    size?: string,
    color?: string,
    ownClassName?: string,
    onClick?: (event: any) => void,
}

const Icon: React.FC<IProps> = (props) => {

    const {name, type, size, color, onClick, ownClassName} = props;
    const className = (`icon ${type} fa-${name} ${size ? `fa-${size}` : ''} ${ownClassName}`)

    return (
        <i
            className={className}
            style={{color: color}}
            onClick={onClick}
        />
    );
};

export default React.memo(Icon);
