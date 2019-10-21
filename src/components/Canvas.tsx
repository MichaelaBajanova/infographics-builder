import React from 'react';
import '../styles/Canvas.scss';
import {IInfographicsSection} from '../types/IInfographicsSection';
import {IInfographicsDetails} from '../types/IInfographicsDetails'
import SectionRow from './SectionRow'

interface IProps {
    infographicsDetails: IInfographicsDetails,
    selectedSection: IInfographicsSection | null,
    handleToggleSelectSection: (section: IInfographicsSection) => void,
    handleDeleteSection: (section: IInfographicsSection) => void,
    columnsCount: number,
}

const Canvas: React.FC<IProps> = (props) => {

    const {infographicsDetails, selectedSection, handleToggleSelectSection, handleDeleteSection} = props;
    const {infographics, widthPx} = infographicsDetails

    const style = {
        width: `${widthPx}px`
    }

    const onCanvasClick = () => {
        if (selectedSection !== null) {
            handleToggleSelectSection(selectedSection)
        }
    }

    return (
        <div className="scope__Canvas" onClick={onCanvasClick}>
            <div className="canvas">
                <div className={`infographics ${!infographics.length ? 'infographics--empty' : ''}`} style={style}>
                    {infographics.map(
                        (row) => (
                            <SectionRow
                                row={row}
                                selectedSection={selectedSection}
                                handleToggleSelectSection={handleToggleSelectSection}
                                handleDeleteSection={handleDeleteSection}
                            />)
                    )}
                </div>
            </div>
        </div>
    );
};

export default Canvas;
