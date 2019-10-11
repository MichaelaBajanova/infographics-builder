import React from 'react'
import '../styles/InfographicsSection.scss'
import Icon from './Icon'
import {EIconName} from '../enums/EIconName'
import {ILayoutSection} from '../types/ILayoutSection'

interface IProps {
    id: number,
    isActive: boolean,
    layoutSection: ILayoutSection | null,
    handleToggleSelectSection: (id: number) => void,
    handleDeleteSection: (id: number) => void,
}

const InfographicsSection: React.FC<IProps> = (props) => {

    const {id, isActive, layoutSection, handleToggleSelectSection, handleDeleteSection} = props;

    let infographicsSectionStyle
    if (layoutSection !== null) {
        infographicsSectionStyle = {
            //gridColumn: `${layoutSection.x + 1} / ${layoutSection.x + 1 + layoutSection.spanColumns }`,
            gridColumn: `${layoutSection.columnStart} / ${layoutSection.columnEnd}`,
            gridRow: `${layoutSection.y + 1} / ${layoutSection.y + 2}`,
        }
    }

    const onInfographicsSectionClick = () => {
        handleToggleSelectSection(id);
    };

    const onDeleteIconClick = () => {
        handleDeleteSection(id);
    };

    return (
        <div className="scope__InfographicsSection" style={infographicsSectionStyle}>
            <div
                className={`infographics__infographics-section ${isActive ? 'infographics__infographics-section--active' : ''}`}
                onClick={onInfographicsSectionClick}
            >
                <span className="infographics__delete-infographics" onClick={onDeleteIconClick}>
                    <Icon name={EIconName.CLEAR}/>
                </span>
            </div>
        </div>
    );
};

export default InfographicsSection
