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

    const onSelectSection = () => {
        handleSelectSection(id);
    };

    return (
        <div className="scope__InfographicsSection">
            <div
                className={`infographics__infographics-section ${isActive && 'infographics__infographics-section--active'}`}
                onClick={onSelectSection}
            >
                Section #{id + 1}
                <Icon
                    name={EIconName.deleteInfographicsSection}
                />
            </div>
        </div>
    );
};

export default React.memo(InfographicsSection);