import React from 'react';
import Header from './components/Header';
import Editor from './components/Editor';
import Canvas from './components/Canvas';
import './styles/App.scss';
import {IInfographicsSection} from './types/TInterfaceSection';

interface IState {
    infographicsSections: IInfographicsSection[],
    lastUsedId: number,
    selectedSectionId: number | null
}

class App extends React.Component<{}, IState> {

    state = {
        infographicsSections: [] as IInfographicsSection[],
        lastUsedId: 0,
        selectedSectionId: null
    };

    public render() {

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
                    />
                    <Canvas
                        infographicsSections={infographicsSections}
                        selectedSectionId={selectedSectionId}
                        handleSelectSection={this.handleSelectSection}
                    />
                </div>
            </div>
        );
    }

    private handleAddSection = () => {

        const {infographicsSections, lastUsedId, selectedSectionId} = this.state;

        const newSection: IInfographicsSection = {
            id: lastUsedId,
            isActive: false
        };

        this.setState({
            infographicsSections: [...infographicsSections, newSection],
            lastUsedId: lastUsedId + 1,
            selectedSectionId
        });
    };

    private handleSelectSection = (selectedSectionId: number) => {

        this.setState({
            selectedSectionId
        });
    };

    private handleDeleteSection = () => {

        const {infographicsSections, selectedSectionId: id} = this.state;

        const sectionPosition: number = infographicsSections.findIndex(
            (infographicsSection) => {return infographicsSection.id === id});

        const infographicsSectionsCopy: IInfographicsSection[] = infographicsSections;
        infographicsSectionsCopy.splice(sectionPosition, 1);

        this.setState({
            infographicsSections: infographicsSectionsCopy,
            selectedSectionId: null
        });
    };
}

export default App;
