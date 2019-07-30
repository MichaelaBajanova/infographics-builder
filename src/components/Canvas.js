import React from 'react';
import '../styles/Canvas.scss';
import InfographicsSection from "./InfographicsSection";

const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "solid 1px #ddd",
    background: "#fff"
};

class Canvas extends React.Component {

    constructor(props) {
        super(props);
        this.createSection = this.createSection.bind(this);
    }

    createSection(section) {
        return <InfographicsSection number={section.key}
                                    key={section.key}
                                    isActive={section.isActive}
                                    selectSection={this.props.selectSection}
        ></InfographicsSection>;
    }

    render() {
        const infographicsSections = this.props.infographicsSections;
        return (
            <div className="canvas">
                <div className="infographics-wrapper">
                    {infographicsSections.map(this.createSection)}
                </div>
            </div>
        );
    }
}

export default Canvas;