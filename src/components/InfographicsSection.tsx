import React from 'react';
import '../styles/InfographicsSection.scss'
import Icon from "./Icon";

interface IProps {
    id: number,
    key: number,
    isActive: boolean,
    selectSection: (id: number) => void
}

const InfographicsSection: React.FunctionComponent<IProps> = (props) => {

    const {isActive, id, selectSection} = props;

    return (
        <div
            id={id.toString()}
            className={`infographics__infographics-section ${isActive && 'infographics__infographics-section--active'}`}
            onClick={() => selectSection(id)}>
            Section #{id + 1}
            <Icon
                name={'times-circle'}
            />
        </div>
    );
};

export default InfographicsSection;