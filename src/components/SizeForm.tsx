import React from 'react'
import {IInfographicsDetails} from '../types/IInfographicsDetails'
import {IInfographicsSection} from '../types/IInfographicsSection'
import '../styles/SizeForm.scss'
import Icon from './ui/Icon'
import {EIconName, EIconType} from '../enums/EIconName'

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

class SizeForm extends React.Component<IProps, IState> {

    state: IState = {
        widthInputValue: this.props.infographicsDetails.width,
        heightInputValue: 0,
    }

    render() {
        const {selectedSection} = this.props

        return (
            <div className={'scope__SizeForm'}>
                <form className={'width-form'} onSubmit={this.onWidthFormSubmit}>
                    <label htmlFor={'width'}>
                        <Icon name={EIconName.WIDTH} type={EIconType.SOLID}/>
                    </label>
                    <input
                        id={'width'}
                        name="width"
                        value={this.state.widthInputValue}
                        onChange={this.onWidthInputChange}
                        type="number"
                    />
                </form>
                <form className={'height-form'} onSubmit={this.onHeightFormSubmit}>
                    <label htmlFor={'height'}>
                        <Icon name={EIconName.HEIGHT} type={EIconType.SOLID}/>
                    </label>
                    <input
                        id={'height'}
                        name="height"
                        value={this.state.heightInputValue}
                        onChange={this.onHeightInputChange}
                        type="number"
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
        setWidth(Number(widthInputValue))
    }

    private onHeightFormSubmit = (event: any) => {
        const {heightInputValue} = this.state
        const {setHeight, selectedSection} = this.props

        event.preventDefault()
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
}

export default SizeForm
