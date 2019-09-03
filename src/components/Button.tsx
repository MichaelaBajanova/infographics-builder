import React, {ReactNode} from 'react';

interface IProps {
    children: ReactNode,
    action: () => void,
    disabled?: boolean
}

const Button: React.FC<IProps> = (props) => {

    const {action, disabled} = props;

    return (
        <button
            className="button"
            onClick={action}
            disabled={disabled}
        >
            {props.children}
        </button>
    );
};

export default React.memo(Button);