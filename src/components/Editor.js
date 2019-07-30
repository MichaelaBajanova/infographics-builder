import React from 'react';
import '../styles/Editor.scss'

class Editor extends React.Component {

    constructor(props) {
        super(props);
        this.getSelectedSectionId = this.getSelectedSectionId.bind(this);
    }


    getSelectedSectionId() {

        for (let i = 0; i < this.props.infographicsSections.length; ++i) {

            if (this.props.infographicsSections[i].isActive) {
                return this.props.infographicsSections[i].key;
            }
        }

        throw "No section is seleted.";
    }

     render() {
         return (
             <div className="editor">
                <button className="button" onClick={this.props.addSection}>Add</button>
                 <button className="button" onClick={() => this.props.deleteSection(this.getSelectedSectionId())}>Delete this section</button>
             </div>
         )
     }
}

export default Editor;
