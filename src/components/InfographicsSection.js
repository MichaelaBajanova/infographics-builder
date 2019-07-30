import React from 'react';
import '../styles/InfographicsSection.scss'

class InfographicsSection extends React.Component {

    render() {

        if (this.props.isActive) {
            return (
                <div id={this.props.number}
                     className="infographics-section infographics-section--active"
                     onClick={() => this.props.selectSection(this.props.number)}>
                     Section #{this.props.number + 1}
                </div>
            )

        }

        return (
            <div
                id={this.props.number}
                className="infographics-section"
                onClick={() => this.props.selectSection(this.props.number)}>
                Section #{this.props.number + 1}
            </div>
        )
    }
}

export default InfographicsSection;