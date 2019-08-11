import React from 'react';

export const EIconPrefix = {
    regular: 'far',
    solid: 'fas'
};

interface IProps {
    name: string,
    prefix?: string
}

const Icon: React.FunctionComponent<IProps> = (props) => {

    const {name, prefix} = props;

    return (
        <i className={`${prefix} fa-${name}`} />
    );
};

Icon.defaultProps = {
    prefix: EIconPrefix.regular
};

export default React.memo(Icon);