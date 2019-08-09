import React from 'react';
import '../styles/Canvas.scss';
import {Section} from "../App";

interface IProps {
    infographicsSections: Section[],
    createSection: (section: Section) => object
}

const Canvas: React.FunctionComponent<IProps> = (props) => {

    const {infographicsSections, createSection} = props;

    return (
        <div className="canvas">
            <div className="infographics-wrapper">
                {infographicsSections.map(createSection)}
            </div>
        </div>
    );
};

export default Canvas;