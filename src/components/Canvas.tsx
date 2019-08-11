import React from 'react';
import '../styles/Canvas.scss';
import {TInfographicsSection} from '../types/TInterfaceSection';

interface IProps {
    infographicsSections: TInfographicsSection[],
    createSection: (section: TInfographicsSection) => object
}

const Canvas: React.FC<IProps> = (props) => {

    const {infographicsSections, createSection} = props;

    return (
        <div className="canvas">
            <div className="infographics">
                {infographicsSections.map(createSection)}
            </div>
        </div>
    );
};

export default Canvas;