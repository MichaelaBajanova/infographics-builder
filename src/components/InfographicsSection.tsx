import React from 'react'
import '../styles/InfographicsSection.scss'
import Icon from './Icon'
import {EIconName} from '../enums/EIconName'
import {IInfographicsSection} from '../types/IInfographicsSection'

interface IProps {
    section: IInfographicsSection,
    handleToggleSelectSection: (section: IInfographicsSection) => void,
    handleDeleteSection: (section: IInfographicsSection) => void,
}

const InfographicsSection: React.FC<IProps> = (props) => {

    const {section, handleToggleSelectSection, handleDeleteSection} = props;
    const {column, isActive} = section

    let infographicsSectionStyle
    infographicsSectionStyle = {
        gridColumn: `${column.start} / ${column.end}`,
    }

    const onInfographicsSectionClick = () => {
        console.log("clicking on", section)
        handleToggleSelectSection(section);
    };

    const onDeleteIconClick = () => {
        handleDeleteSection(section);
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
