import React from 'react';
import Header from './components/Header';
import Editor from './components/Editor';
import Canvas from './components/Canvas';
import './styles/App.scss';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            infographicsSections: [],
            numberOfAddedSections: 0
        };
        this.addSection = this.addSection.bind(this);
        this.deleteSection = this.deleteSection.bind(this);
        this.selectSection = this.selectSection.bind(this);
    }

    addSection() {
        let newSection = {
            key: this.state.numberOfAddedSections,
            isActive: false
        };

        this.setState((prevState) => ({
            infographicsSections: prevState.infographicsSections.concat(newSection),
            numberOfAddedSections: prevState.numberOfAddedSections + 1
        }));
    }

    selectSection(id) {

        console.log("Select");

        let sections = this.state.infographicsSections;

        for (let i = 0; i < sections.length; ++i) {

            if (sections[i].key === id) {
                sections[i].isActive = true;

            } else {
                sections[i].isActive = false;
            }
        }

        this.setState((prevState) => ({
            infographicsSections: sections,
            numberOfAddedSections: prevState.numberOfAddedSections
        }));
    }

    deleteSection(id) {

        let sectionPosition = 0;

        for (let i = 0; i < this.state.infographicsSections.length; ++i) {

            if (this.state.infographicsSections[i].key === id) {
                sectionPosition = i;
                break;
            }
        }

        this.state.infographicsSections.splice(sectionPosition, 1);

        this.setState((prevState) => ({
            infographicsSections: prevState.infographicsSections,
            numberOfAddedSections: prevState.numberOfAddedSections
        }));
    }

    render() {
        return (
            <div className="app">
                <Header></Header>
                <div className="app-wrapper">
                    <Editor infographicsSections={this.state.infographicsSections}
                            addSection={this.addSection}
                            deleteSection={this.deleteSection}>
                    </Editor>
                    <Canvas infographicsSections={this.state.infographicsSections}
                            selectSection={this.selectSection}></Canvas>
                </div>
            </div>
        );
    }
}

export default App;
