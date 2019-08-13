import React from 'react';

interface IProps {
    action: () => void,
    text: string,
    disabled: boolean
}

const Button: React.FC<IProps> = (props) => {

    const {action, text, disabled} = props;

    return (
        <button
            className="button"
            onClick={action}
            disabled={disabled}
        >
            {text}
        </button>
    );
};

export default React.memo(Button);