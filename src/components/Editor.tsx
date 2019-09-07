import React from 'react';
import '../styles/Editor.scss'
import {IInfographicsSection} from '../types/TInterfaceSection';
import Button from './Button';

interface IProps {
    infographicsSections: IInfographicsSection[],
    addSection: () => void,
}

const Editor: React.FC<IProps> = (props) => {

    const {addSection} = props;

    return (
        <div className="scope__Editor">
            <div className="editor">
                <Button
                    action={addSection}
                >
                    Add new section
                </Button>
            </div>
        </div>
    );
};

export default Editor;
