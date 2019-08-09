import React from 'react';

export const EIconPrefix = {
    regular: 'far',
    solid: 'fas'
};

interface IProps {
    name: string,
    prefix: string
}

const Icon = (props: IProps) => {
    const {name, prefix} = props;

    return (
        <i className={`${prefix} fa-${name}`} />
    );
};

export default React.memo(Icon);