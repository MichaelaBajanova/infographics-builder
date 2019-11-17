import React from 'react'
import {IInfographicsRow, IInfographicsSection} from '../types/IInfographicsSection'
import InfographicsSection from './InfographicsSection'

interface IProps {
    row: IInfographicsRow,
    selectedSection: IInfographicsSection | null,
    handleToggleSelectSection: (section: IInfographicsSection) => void,
    handleDeleteSection: (section: IInfographicsSection) => void,
}

const SectionRow = (props: IProps) => {
    const {row, selectedSection, handleDeleteSection, handleToggleSelectSection} = props
    const {sections, height} = row

    const generateColumnTemplate = (): string =>
        row.sections.reduce((acc, section) => acc += `${section.widthPercent}% `, '').trim()

    const style = {
        height: height,
        display: 'grid',
        gridTemplateColumns: generateColumnTemplate(),
    }

    return (
        <div className={'section-row'} style={style}>
            {sections.map(section => {
                const isActive = selectedSection ? section.id === selectedSection.id : false
                const sectionUpdated = {
                    ...section,
                    isActive,
                }

                return <InfographicsSection
                    key={section.id}
                    section={sectionUpdated}
                    handleToggleSelectSection={handleToggleSelectSection}
                    handleDeleteSection={handleDeleteSection}
                />
            })}
        </div>
    )
}

export default SectionRow;
