import React from 'react';
import '../styles/Canvas.scss';
import {TInfographicsSection} from '../types/TInterfaceSection';
import InfographicsSection from "./InfographicsSection";

interface IProps {
    infographicsSections: TInfographicsSection[],
    selectedSectionId: number,
    handleSelectSection: (id: number) => void
}

const Canvas: React.FC<IProps> = (props) => {

    const {infographicsSections, selectedSectionId, handleSelectSection} = props;

    return (
        <div className="scope__Canvas">
            <div className="canvas">
                <div className="infographics">
                    {infographicsSections.map(
                        (infographicsSection) => { return (
                            <InfographicsSection
                                id={infographicsSection.id}
                                key={infographicsSection.id}
                                isActive={infographicsSection.id === selectedSectionId}
                                handleSelectSection={handleSelectSection}
                            />);
                        })}
                </div>
            </div>
        </div>
    );
};

export default Canvas;