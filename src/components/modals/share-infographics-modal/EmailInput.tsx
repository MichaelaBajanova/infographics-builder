import React from 'react'
import 'styles/modals/share-infographics-modal/EmailInput.scss'
import validate from 'validate.js'
import Icon from 'components/ui/Icon'
import {EIconName, EIconType} from 'enums/EIconName'

interface IProps {
    addEmail: (email: string) => void,
    deleteEmail: (emailIndex: number) => void,
    emailList: string[],
}

interface IState {
    emailInputValue: string,
    isNotEmailWarningDisplayed: boolean,
}

class EmailInput extends React.Component<IProps, IState> {

    state: IState = {
        emailInputValue: '',
        isNotEmailWarningDisplayed: false,
    }

    render() {
        const {emailList} = this.props
        const {emailInputValue, isNotEmailWarningDisplayed} = this.state
        const className = 'email'

        return (
            <div className={'scope__EmailInput'}>
                <ul>
                    {emailList.map((email, index) => {
                        return (
                            <li key={index} className={`${className} ${className}-${index}`}>
                                <span className={`${className}__value ${className}-${index}__value`}>{email}</span>
                                <span
                                    className={`${className}__delete ${className}-${index}__delete`}
                                    onClick={this.onDeleteEmailClick}
                                >
                                    <Icon name={EIconName.CLEAR} type={EIconType.SOLID}/>
                                </span>
                            </li>
                        )
                    })}
                </ul>
                <form autoComplete={'off'}>
                    <input type={'text'} value={emailInputValue} onChange={this.onEmailInputChange} />
                    <button onClick={this.onAddEmailButtonClick}><Icon type={EIconType.SOLID} name={EIconName.ADD}/></button>
                </form>
                <span
                    className={`invalid-email-warning ${isNotEmailWarningDisplayed ? 'invalid-email-warning--displayed': ''}`}
                >
                    Invalid email.
                </span>
            </div>
        )
    }

    private onEmailInputChange = (event: any) => {
        this.setState({
            emailInputValue: event.target.value,
            isNotEmailWarningDisplayed: false,
        })
    }

    private onAddEmailButtonClick = (event: any) => {
        event.preventDefault()
        const {addEmail} = this.props
        const {emailInputValue} = this.state

        const constraints = {
            from: {email: true}
        }

        if (validate({from: emailInputValue}, constraints)) {
            this.setState({
                isNotEmailWarningDisplayed: true,
            })
            return;
        }

        addEmail(emailInputValue)

        this.setState({
            emailInputValue: '',
        })
    }

    private onDeleteEmailClick = (event: any) => {
        const {deleteEmail} = this.props

        const targetClass = event.target.parentNode.parentNode.className
        const indexPositionStart = targetClass.lastIndexOf('-') + 1
        const indexPositionEnd = targetClass.length
        const index = Number(targetClass.slice(indexPositionStart, indexPositionEnd))

        deleteEmail(index)
    }
}

export default EmailInput
