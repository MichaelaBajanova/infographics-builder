import React from 'react';
import Header from './components/Header';
import Editor from './components/Editor';
import Canvas from './components/Canvas';
import './styles/App.scss';
import {IInfographicsSection} from './types/TInterfaceSection';

interface IState {
    infographicsSections: IInfographicsSection[],
    lastUsedId: number,
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
                        addSection={this.handleAddSection}
                    />
                    <Canvas
                        infographicsSections={infographicsSections}
                        selectedSectionId={selectedSectionId}
                        handleDeleteSection={this.handleDeleteSection}
                    />
                </div>
            </div>
        );
    }

    private handleAddSection = () => {

        const {infographicsSections, lastUsedId} = this.state;

        const newSection: IInfographicsSection = {
            id: lastUsedId,
            isActive: false
        };

        this.setState({
            infographicsSections: [...infographicsSections, newSection],
            lastUsedId: lastUsedId + 1,
        });
    };

    private handleDeleteSection = (id: number) => {

        const {infographicsSections} = this.state;

        const sectionPosition: number = infographicsSections.findIndex(
            (infographicsSection) => {return infographicsSection.id === id});

        const infographicsSectionsCopy: IInfographicsSection[] = [...infographicsSections];
        infographicsSectionsCopy.splice(sectionPosition, 1);

        this.setState({
            infographicsSections: infographicsSectionsCopy,
        });
    };
}

export default App;
