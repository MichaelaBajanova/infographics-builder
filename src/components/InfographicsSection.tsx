import React from 'react';
import '../styles/InfographicsSection.scss'
import Icon, {EIconPrefix} from './Icon'

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
            className={`infographics-section ${isActive && 'infographics-section--active'}`}
            onClick={() => selectSection(id)}>
            Section #{id + 1}
            <Icon
                prefix={EIconPrefix.regular}
                name={'times-circle'}
            />
        </div>
    );
};

export default InfographicsSection;