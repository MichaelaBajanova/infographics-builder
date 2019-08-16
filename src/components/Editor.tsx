import React from 'react';
import '../styles/Editor.scss'
import {TInfographicsSection} from '../types/TInterfaceSection';
import Button from "./Button";

interface IProps {
    infographicsSections: TInfographicsSection[],
    selectedSectionId: number | null,
    addSection: () => void,
    deleteSection: () => void,
}

const Editor: React.FC<IProps> = (props) => {

    const {selectedSectionId, addSection, deleteSection} = props;

    return (
        <div className="editor">
            <Button
                action={addSection}
                text={"Add new section"}
                disabled={false}
            />
            <Button
                action={deleteSection}
                text={"Delete section"}
                disabled={selectedSectionId === null}
            />
        </div>
    );
};

export default Editor;
