import React, {ReactNode} from 'react'
import 'styles/ui/Modal.scss'
import {EModalSize} from 'enums/EModalSize'

interface IProps {
    children: ReactNode,
    footer?: ReactNode,
    headerText: string,
    isSubmitButtonDisabled?: boolean,
    onCancelButtonClick: () => void,
    onSubmitButtonClick: () => void,
    size: EModalSize,
    submitButtonText?: string,
    submitButtonColor?: string,
}

const Modal = (props: IProps) => {

    const {
        children,
        footer,
        headerText,
        isSubmitButtonDisabled,
        onCancelButtonClick,
        onSubmitButtonClick,
        size,
        submitButtonText,
        submitButtonColor,
    } = props
    const className = `scope__Modal modal modal--${size}`

    const submitButtonStyle = {
        backgroundColor: submitButtonColor
    }

    return (
        <div className={className}>
            <div className={'modal__header'}>
                <h1 className={'modal__header-text'}>
                    {headerText}
                </h1>
            </div>
            <div className={'modal__content'}>
                {children}
            </div>
            <div className={'modal__footer'}>
                {footer
                    ? footer
                    : <>
                        <button
                            className={'cancel-button'}
                            onClick={onCancelButtonClick}
                        >
                            Cancel
                        </button>
                        <button
                            className={'submit-button'}
                            onClick={onSubmitButtonClick}
                            disabled={isSubmitButtonDisabled ? isSubmitButtonDisabled : false}
                            style={submitButtonStyle}
                        >
                            {submitButtonText ? submitButtonText : 'Submit'}
                        </button>
                    </>
                }
            </div>
        </div>
    )
}

export default Modal
