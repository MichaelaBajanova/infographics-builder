import React from 'react';
import '../styles/Editor.scss'
import {TInfographicsSection} from '../types/TInterfaceSection';

interface IProps {
    infographicsSections: TInfographicsSection[],
    selectedSectionId: number,
    addSection: () => void,
    deleteSection: (id: number) => void
}

const Editor: React.FC<IProps> = (props) => {

    const {selectedSectionId, addSection, deleteSection} = props;

    return (
        <div className="editor">
            <button
                className="button"
                onClick={addSection}
            >
                Add
            </button>
            <button
                className="button"
                onClick={() => deleteSection(selectedSectionId)}
                disabled={selectedSectionId < 0}
            >
                Delete this section
            </button>
        </div>
    );
};

export default Editor;
