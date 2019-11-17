import React from 'react'
import '../styles/Editor.scss'
import Button from './Button'
import {IInfographicsDetails} from '../types/IInfographicsDetails'
import {IInfographicsSection} from '../types/IInfographicsSection'

interface IProps {
    infographicsDetails: IInfographicsDetails,
    selectedSection: IInfographicsSection | null,
    addSection: () => void,
    divideSection: (section: IInfographicsSection) => void,
    setInfographicsWidth: (width: number) => void,
    setRowHeight: (section: IInfographicsSection, height: number) => void,
}

interface IState {
    widthInputValue: number,
    heightInputValue: number,
}

class Editor extends React.Component<IProps, IState> {

    state: IState = {
        widthInputValue: this.props.infographicsDetails.width,
        heightInputValue: 0,
    }

    render() {
        const {selectedSection, addSection} = this.props;

        return (
            <div className="scope__Editor">
                <div className="editor">
                    <Button
                        action={addSection}
                    >
                        Add new section
                    </Button>
                    <Button
                        action={this.handleDivideColumn}
                        disabled={selectedSection === null}
                    >
                        Divide
                    </Button>
                    <form onSubmit={this.onWidthFormSubmit}>
                        <label>Width:</label>
                        <input name="width" value={this.state.widthInputValue} onChange={this.onWidthInputChange} type="number"/>
                    </form>
                    <form onSubmit={this.onHeightFormSubmit}>
                        <label>Height:</label>
                        <input
                            name="height"
                            value={this.state.heightInputValue}
                            onChange={this.onHeightInputChange}
                            type="number"
                            disabled={!selectedSection}
                        />
                    </form>
                </div>
            </div>
        );
    }

    private handleDivideColumn = () => {
        const {selectedSection, divideSection} = this.props

        if (selectedSection !== null) {
            divideSection(selectedSection)
        }
    }

    private onWidthFormSubmit = (event: React.FormEvent) => {
        const {widthInputValue} = this.state
        const {setInfographicsWidth} = this.props

        event.preventDefault()
        setInfographicsWidth(Number(widthInputValue))
    }

    private onHeightFormSubmit = (event: React.FormEvent) => {
        const {heightInputValue} = this.state
        const {setRowHeight, selectedSection} = this.props

        event.preventDefault()
        setRowHeight(selectedSection!, Number(heightInputValue))
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

export default Editor;
