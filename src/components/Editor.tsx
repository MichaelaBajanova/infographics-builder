import React from 'react';
import '../styles/Editor.scss'
import {IInfographicsSection} from '../types/IInfographicsSection';
import Button from './Button';
import {IInfographicsDetails} from '../types/IInfographicsDetails'

interface IProps {
    infographicsDetails: IInfographicsDetails,
    infographicsSections: IInfographicsSection[],
    selectedSectionId: number | null,
    addSection: () => void,
    divideSection: (id: number) => void,
    setSize: (width: string) => void,
}

interface IState {
    widthInputValue: string,
}

class Editor extends React.Component<IProps, IState> {

    state = {
        widthInputValue: '',
    }

    render() {
        const {selectedSectionId, addSection} = this.props;

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
                        disabled={selectedSectionId === null}
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
        const {selectedSectionId, divideSection} = this.props

        if (selectedSectionId !== null) {
            divideSection(selectedSectionId)
        }
    }

    private onFormSubmit = (event: any) => {
        const {setSize} = this.props

        event.preventDefault()
        setSize(this.state.widthInputValue)
    }

    private onInputChange = (event: any) => {
        this.setState({
            widthInputValue: event.target.value,
        })
    }
};

export default Editor;
