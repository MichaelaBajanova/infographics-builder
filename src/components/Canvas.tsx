import React from 'react';
import '../styles/Canvas.scss';
import {IInfographicsSection} from '../types/IInfographicsSection';
import InfographicsSection from './InfographicsSection';
import {IInfographicsDetails} from '../types/IInfographicsDetails'
import {ILayoutSection} from '../types/ILayoutSection'

interface IProps {
    infographicsDetails: IInfographicsDetails,
    infographicsSections: IInfographicsSection[],
    selectedSectionId: number | null,
    handleToggleSelectSection: (id: number) => void,
    handleDeleteSection: (id: number) => void,
    columnsCount: number,
}

// const generateGridTemplateArea = (sectionLayout: ILayoutSection[][], width: number) => {
//     let result: string[] = []
//
//     for (let row of sectionLayout) {
//         let rowString: string[] = []
//
//         for (let section of row) {
//             const sectionWidth: number = section.end - section.start
//             let numberOfColumnsInTemplate: number = width * (sectionWidth / 100)
//             for (let i = 0; i < numberOfColumnsInTemplate; ++i) {
//                 rowString.push(`${section.id}`)
//             }
//         }
//         result.push(rowString.join(' '))
//     }
//     return result.join(' ')
// }

const findLayoutSectionById = (layout: ILayoutSection[][], id: number) => {
    for (let row of layout) {
        for (let section of row) {
            if (section.id === id) {
                return section
            }
        }
    }
    return null
}


const Canvas: React.FC<IProps> = (props) => {

    const {infographicsDetails, infographicsSections, selectedSectionId, handleToggleSelectSection, handleDeleteSection} = props;
    let maxColumns: number = 0
    infographicsDetails.sectionLayout.forEach(row => maxColumns = row.length > maxColumns ? row.length : maxColumns)
    const rowWithMostColumns = infographicsDetails.sectionLayout.find(row => row.length === maxColumns)
    const gridTemplateColumns: string[] = []

    if (rowWithMostColumns) {
        rowWithMostColumns.forEach(section => {
            let width = section.end - section.start
            gridTemplateColumns.push(`${width}%`)
        })
    }

    const infographicsStyle = {
        width: infographicsDetails.width,
        display: 'grid',
        gridTemplateColumns: gridTemplateColumns.join(' '),
    }

    const onCanvasClick = () => {
        if (selectedSectionId !== null) {
            handleToggleSelectSection(selectedSectionId)
        }
    }

    return (
        <div className="scope__Canvas" onClick={onCanvasClick}>
            <div className="canvas">
                <div className="infographics" style={infographicsStyle}>
                    {infographicsSections.map(
                        (infographicsSection) => (
                            <InfographicsSection
                                id={infographicsSection.id}
                                key={infographicsSection.id}
                                layoutSection={findLayoutSectionById(infographicsDetails.sectionLayout, infographicsSection.id)}
                                isActive={infographicsSection.id === selectedSectionId}
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
