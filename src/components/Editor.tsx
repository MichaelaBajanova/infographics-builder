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
    setSize: (widthPx: number) => void,
}

interface IState {
    widthInputValue: string,
}

class Editor extends React.Component<IProps, IState> {

    state = {
        widthInputValue: '',
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
                    <form onSubmit={this.onFormSubmit}>
                        <label>Width:</label>
                        <input name="width" value={this.state.widthInputValue} onChange={this.onInputChange} type="text"/>
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

    private onFormSubmit = (event: any) => {
        const {widthInputValue} = this.state
        const {setSize} = this.props

        event.preventDefault()
        setSize(Number(widthInputValue))
    }

    private onInputChange = (event: any) => {
        this.setState({
            widthInputValue: event.target.value,
        })
    }
}

export default Editor;
