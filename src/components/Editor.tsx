import React from 'react';
import '../styles/Editor.scss'
import {TInfographicsSection} from '../types/TInterfaceSection';

interface IProps {
    infographicsSections: TInfographicsSection[],
    addSection: () => void,
    deleteSection: (id: number) => void
}

class Editor extends React.Component<IProps> {

    getSelectedSectionId = () => {

        const {infographicsSections} = this.props;

        for (let i = 0; i < infographicsSections.length; ++i) {

            if (infographicsSections[i].isActive) {
                return infographicsSections[i].id;
            }
        }

        throw new Error("No section is seleted.");
    };

    render = () => {
        const {addSection, deleteSection} = this.props;

         let selectedSectionId: number;
         let isDeleteButtonDisabled: boolean = false;
         try {
            selectedSectionId = this.getSelectedSectionId();
         } catch (e) {
             isDeleteButtonDisabled = true;
         }

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
                     disabled={isDeleteButtonDisabled}
                 >Delete this section
                 </button>
             </div>
         );
     };
}

export default Editor;
