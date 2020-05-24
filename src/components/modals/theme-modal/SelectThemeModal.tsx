import React from 'react'
import 'styles/modals/theme-modal/SelectThemeModal.scss'
import Modal from 'components/ui/Modal'
import Theme from 'components/modals/theme-modal/Theme'
import {ITheme} from 'types/ITheme'
import {EModalSize} from 'enums/EModalSize'
import {COLOR_USAGES, THEMES} from 'constants/themes'

interface IProps {
    closeThemeModal: () => void,
    selectedTheme: ITheme,
    setTheme: (theme: ITheme) => void,
}

interface IState {
    theme: ITheme,
}

class SelectThemeModal extends React.Component<IProps, IState> {

    state: IState = {
        theme: this.props.selectedTheme,
    }

    render() {
        const {closeThemeModal} = this.props
        const {theme} = this.state
        const isSaveButtonDisabled = theme === null

        return (
            <div className={'scope__SelectThemeModal'}>
                <Modal
                    headerText={'Select a Theme'}
                    isSubmitButtonDisabled={isSaveButtonDisabled}
                    onCancelButtonClick={closeThemeModal}
                    onSubmitButtonClick={this.onSaveButtonClick}
                    size={EModalSize.SMALL_LONG}
                    submitButtonText={'Save changes'}
                >
                    {
                        <>
                            <div className={'help'}>
                                {
                                    Object.keys(COLOR_USAGES).map((key, index) => {
                                        return (
                                            <span key={index}>
                                            <span className={'type-sign'}>
                                                {COLOR_USAGES[key].shortName}
                                            </span>
                                            <span className={'type-name'}>
                                                {` - ${COLOR_USAGES[key].longName}`}
                                            </span>
                                        </span>
                                        )
                                    })
                                }
                            </div>
                            <ul className={'themes'}>
                                {
                                    Object.keys(THEMES).map((key, index) => {
                                        return (
                                            <li className={`theme theme-${key}`} key={index}>
                                                <Theme
                                                    theme={THEMES[key]}
                                                    selectedTheme={theme}
                                                    selectTheme={this.handleSelectTheme}
                                                    selectStripeStyle={this.handleSelectStripeStyle}
                                                />
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </>
                    }
                </Modal>
            </div>
        )
    }

    private handleSelectTheme = (event: any) => {
        const targetClass = event.target.className
        const themeKey = targetClass.slice(targetClass.lastIndexOf('-') + 1, targetClass.length)

        this.setState({
            theme: THEMES[themeKey]
        })
    }

    private handleSelectStripeStyle = (event: any) => {
        const {theme} = this.state
        const targetClass = event.target.className
        const stripeStyle = targetClass.slice(targetClass.lastIndexOf('-') + 1, targetClass.length)

        this.setState({
            theme: {
                ...theme,
                stripeStyle,
            }
        })
    }

    private onSaveButtonClick = () => {
        const {setTheme, closeThemeModal} = this.props
        const {theme} = this.state

        setTheme(theme!)
        closeThemeModal()
    }
}

export default SelectThemeModal
