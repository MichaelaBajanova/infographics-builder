import React from 'react';
import '../styles/InfographicsSection.scss'
import Icon from "./Icon";
import {EIconName} from "../enums/EIconName";

interface IProps {
    id: number,
    isActive: boolean,
    handleSelectSection: (id: number) => void
}

const InfographicsSection: React.FC<IProps> = (props) => {

    const {id, isActive, handleSelectSection} = props;

    return (
        <div
            key={id}
            className={`infographics__infographics-section ${isActive && 'infographics__infographics-section--active'}`}
            onClick={() => handleSelectSection(id)}
        >
            Section #{id + 1}
            <Icon
                name={EIconName.deleteInfographicsSection}
            />
        </div>
    );
};

export default InfographicsSection;