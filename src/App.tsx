import React from 'react';
import Header from './components/Header';
import Editor from './components/Editor';
import Canvas from './components/Canvas';
import './styles/App.scss';
import InfographicsSection from "./components/InfographicsSection";

export interface Section {
    id: number;
    isActive: boolean;
}

interface IState {
    infographicsSections: Section[];
    numberOfAddedSections: number;
}

class App extends React.Component<{}, IState> {

    state: IState = {
        infographicsSections: [],
        numberOfAddedSections: 0
    };

    createSection = (section: Section) => {

        return <InfographicsSection id={section.id}
                                    key={section.id}
                                    isActive={section.isActive}
                                    selectSection={this.selectSection}
        />;
    };

    addSection = () => {

        const {infographicsSections, numberOfAddedSections} = this.state;

        let newSection: Section = {
            id: numberOfAddedSections,
            isActive: false
        };

        this.setState({
            infographicsSections: infographicsSections.concat(newSection),
            numberOfAddedSections: numberOfAddedSections + 1
        });
    };

    selectSection = (id: number) => {

        const {infographicsSections, numberOfAddedSections} = this.state;

        for (let i: number = 0; i < infographicsSections.length; ++i) {
            infographicsSections[i].isActive = infographicsSections[i].id === id;
        }

        this.setState({
            infographicsSections: infographicsSections,
            numberOfAddedSections: numberOfAddedSections
        });
    };

    deleteSection = (id: number) => {

        const {infographicsSections, numberOfAddedSections} = this.state;

        let sectionPosition: number = 0;

        for (let i: number = 0; i < infographicsSections.length; ++i) {

            if (infographicsSections[i].id === id) {
                sectionPosition = i;
                break;
            }
        }

        infographicsSections.splice(sectionPosition, 1);

        this.setState({
            infographicsSections: infographicsSections,
            numberOfAddedSections: numberOfAddedSections
        });
    };

    render = () => {

        const {infographicsSections} = this.state;

        return (
            <div className="app">
                <Header/>
                <div className="app-wrapper">
                    <Editor
                        infographicsSections={infographicsSections}
                        addSection={this.addSection}
                        deleteSection={this.deleteSection}
                    >
                    </Editor>
                    <Canvas
                        infographicsSections={infographicsSections}
                        createSection={this.createSection}
                    />
                </div>
            </div>
        );
    }
}

export default App;
