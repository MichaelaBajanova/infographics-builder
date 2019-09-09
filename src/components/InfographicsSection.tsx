import React from 'react';
import '../styles/InfographicsSection.scss'
import Icon from './Icon';
import {EIconName} from '../enums/EIconName';

interface IProps {
    id: number,
    isActive: boolean,
    handleDeleteSection: (id: number) => void,
}

const InfographicsSection: React.FC<IProps> = (props) => {

    const {id, isActive, handleDeleteSection} = props;

    const onDeleteSection = () => {
        handleDeleteSection(id);
    };

    return (
        <div className="scope__InfographicsSection">
            <div
                className={`infographics__infographics-section ${isActive ? 'infographics__infographics-section--active' : ''}`}
            >
                Section #{id + 1}
                <span className="infographics__delete-infographics" onClick={onDeleteSection}>
                    <Icon name={EIconName.CLEAR}/>
                </span>
            </div>
        </div>
    );
};

export default React.memo(InfographicsSection);