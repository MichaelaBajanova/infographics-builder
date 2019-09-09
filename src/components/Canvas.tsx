import React from 'react';
import '../styles/Canvas.scss';
import {IInfographicsSection} from '../types/TInterfaceSection';
import InfographicsSection from './InfographicsSection';

interface IProps {
    infographicsSections: IInfographicsSection[],
    selectedSectionId: number | null,
    handleDeleteSection: (id: number) => void,
}

const Canvas: React.FC<IProps> = (props) => {

    const {infographicsSections, selectedSectionId, handleDeleteSection} = props;

    return (
        <div className="scope__Canvas">
            <div className="canvas">
                <div className="infographics">
                    {infographicsSections.map(
                        (infographicsSection) => (
                            <InfographicsSection
                                id={infographicsSection.id}
                                key={infographicsSection.id}
                                isActive={infographicsSection.id === selectedSectionId}
                                handleDeleteSection={handleDeleteSection}
                            />)
                    )}
                </div>
            </div>
        </div>
    );
};

export default Canvas;