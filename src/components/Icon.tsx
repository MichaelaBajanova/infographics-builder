import React from 'react';
import {EIconPrefix} from "../enums/EIconPrefix";

interface IProps {
    name: string,
    prefix?: string
}

const Icon: React.FC<IProps> = (props) => {

    const {name, prefix} = props;

    return (
        <i className={`${prefix} fa-${name}`} />
    );
};

Icon.defaultProps = {
    prefix: EIconPrefix.regular
};

export default React.memo(Icon);