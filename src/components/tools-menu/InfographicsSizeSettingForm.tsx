import React from 'react'
import 'styles/tools-menu/InfographicsSizeSettingForm.scss'
import {Tooltip} from 'react-tippy'
import Icon from 'components/ui/Icon'
import {IInfographicsDetails} from 'types/IInfographicsDetails'
import {IInfographicsSection} from 'types/IInfographicsSection'
import {EIconName, EIconType} from 'enums/EIconName'

interface IState {
    widthInputValue: number,
    heightInputValue: number,
}

interface IProps {
    infographicsDetails: IInfographicsDetails,
    selectedSection: IInfographicsSection | null,
    setWidth: (width: number) => void,
    setHeight: (section: IInfographicsSection, height: number) => void,
}

class InfographicsSizeSettingForm extends React.Component<IProps, IState> {

    state: IState = {
        widthInputValue: this.props.infographicsDetails.width,
        heightInputValue: this.props.selectedSection ? this.props.selectedSection.heightPx : 0,
    }

    componentDidUpdate(prevProps: IProps) {
        if ((!prevProps.selectedSection && this.props.selectedSection) || (prevProps.selectedSection?.id !== this.props.selectedSection?.id)) {
            this.setState({
                heightInputValue: this.props.selectedSection? this.props.selectedSection.heightPx : 0,
            })
        }
    }

    render() {
        const {selectedSection} = this.props

        return (
            <div className={'scope__InfographicsSizeSettingForm'}>
                <span className={'width-form-description'}>Infographics width</span>
                <form className={'width-form'} onSubmit={this.onWidthFormSubmit} autoComplete={'off'}>
                    <label htmlFor={'width'}>
                        <Icon name={EIconName.WIDTH} type={EIconType.SOLID}/>
                    </label>
                    <input
                        id={'width'}
                        name={'width'}
                        value={this.state.widthInputValue}
                        onChange={this.onWidthInputChange}
                        onKeyPress={this.onKeyPress}
                        type={'number'}
                    />
                </form>
                <span
                    className={'height-form-description'}
                >
                    Row height
                    <Tooltip
                        title={'Select a section to change row height'}
                        position={'right'}
                        arrow={true}
                        duration={200}
                        theme={'transparent'}
                        size={'small'}
                        arrowSize={'small'}
                    >
                        <Icon name={EIconName.HELP} type={EIconType.SOLID} color={'#fff'} ownClassName={'height-help'} />
                    </Tooltip>
                </span>
                <form className={'height-form'} onSubmit={this.onHeightFormSubmit} autoComplete={'off'}>
                    <label htmlFor={'height'}>
                        <Icon name={EIconName.HEIGHT} type={EIconType.SOLID}/>
                    </label>
                    <input
                        id={'height'}
                        name={'height'}
                        value={this.state.heightInputValue}
                        onChange={this.onHeightInputChange}
                        onKeyPress={this.onKeyPress}
                        type={'number'}
                        disabled={!selectedSection}
                    />
                </form>
            </div>
        )
    }

    private onWidthFormSubmit = (event: any) => {
        const {widthInputValue} = this.state
        const {setWidth} = this.props

        event.preventDefault()

        if (widthInputValue > 1200) {
            setWidth(1200)
            this.setState({widthInputValue: 1200})
            return
        }

        setWidth(Number(widthInputValue))
    }

    private onHeightFormSubmit = (event: any) => {
        const {heightInputValue} = this.state
        const {setHeight, selectedSection} = this.props

        event.preventDefault()

        if (heightInputValue > 1200) {
            setHeight(selectedSection!, 1200)
            this.setState({heightInputValue: 1200})
            return
        }

        setHeight(selectedSection!, Number(heightInputValue))
    }

    private onWidthInputChange = (event: any) => {
        this.setState({
            widthInputValue: event.target.value,
        })
    }

    private onHeightInputChange = (event: any) => {
        this.setState({
            heightInputValue: event.target.value,
        })
    }

    private onKeyPress = (event: any) => {
        const regex = /\d+/
        if (event.key === 'Enter') {
            return
        }
        if (!String(event.key).match(regex)) {
            event.preventDefault()
        }
    }
}

export default InfographicsSizeSettingForm
