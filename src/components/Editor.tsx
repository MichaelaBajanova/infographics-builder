import React from 'react';
import '../styles/Editor.scss'
import {IInfographicsSection} from '../types/TInterfaceSection';
import Button from './Button';

interface IProps {
    infographicsSections: IInfographicsSection[],
    selectedSectionId: number | null,
    addSection: () => void,
    deleteSection: () => void,
}

const Editor: React.FC<IProps> = (props) => {

    const {selectedSectionId, addSection, deleteSection} = props;

    return (
        <div className="scope__Editor">
            <div className="editor">
                <Button
                    action={addSection}
                >
                    Add new section
                </Button>
                <Button
                    action={deleteSection}
                    disabled={selectedSectionId === null}
                >
                    Delete selected section
                </Button>
            </div>
        </div>
    );
};

export default Editor;
