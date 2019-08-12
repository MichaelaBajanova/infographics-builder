import React from 'react';
import Header from './components/Header';
import Editor from './components/Editor';
import Canvas from './components/Canvas';
import './styles/App.scss';
import {TInfographicsSection} from './types/TInterfaceSection';

interface IState {
    infographicsSections: TInfographicsSection[],
    numberOfAddedSections: number,
    selectedSectionId: number
}

class App extends React.Component<{}, IState> {

    state = {
        infographicsSections: [] as TInfographicsSection[],
        numberOfAddedSections: 0,
        selectedSectionId: -1
    };

    handleAddSection = () => {

        const {infographicsSections, numberOfAddedSections, selectedSectionId} = this.state;

        const newSection: TInfographicsSection = {
            id: numberOfAddedSections,
            isActive: false
        };

        this.setState({
            infographicsSections: [...infographicsSections, newSection],
            numberOfAddedSections: numberOfAddedSections + 1,
            selectedSectionId: selectedSectionId
        });
    };

    handleSelectSection = (id: number) => {

        const {infographicsSections, numberOfAddedSections} = this.state;

        this.setState({
            infographicsSections: infographicsSections,
            numberOfAddedSections: numberOfAddedSections,
            selectedSectionId: id
        });
    };

    handleDeleteSection = (id: number) => {

        const {infographicsSections, numberOfAddedSections} = this.state;

        const sectionPosition: number = infographicsSections.findIndex(
            (infographicsSection) => {return infographicsSection.id === id});

        const infographicsSectionsCopy: TInfographicsSection[] = infographicsSections;
        infographicsSectionsCopy.splice(sectionPosition, 1);

        this.setState({
            infographicsSections: infographicsSectionsCopy,
            numberOfAddedSections: numberOfAddedSections,
            selectedSectionId: -1
        });
    };

    render = () => {

        const {infographicsSections, selectedSectionId} = this.state;

        return (
            <div className="app">
                <Header/>
                <div className="app-wrapper">
                    <Editor
                        infographicsSections={infographicsSections}
                        selectedSectionId={selectedSectionId}
                        addSection={this.handleAddSection}
                        deleteSection={this.handleDeleteSection}
                    >
                    </Editor>
                    <Canvas
                        infographicsSections={infographicsSections}
                        selectedSectionId={selectedSectionId}
                        handleSelectSection={this.handleSelectSection}
                    />
                </div>
            </div>
        );
    }
}

export default App;
