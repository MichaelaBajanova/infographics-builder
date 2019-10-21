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
    const {sections, heightPx} = row

    const generateColumnTemplate = (): string => {
        let template = ''
        row.sections.forEach(section => {
            template += `${section.widthPercent}% `
        })

        return template.trim()
    }

    const style = {
        height: `${heightPx}px`,
        display: 'grid',
        gridTemplateColumns: generateColumnTemplate(),
    }

    return (
        <div className={'section-row'} style={style}>
            {sections.map(section => {
                let isActive = false
                if (selectedSection) {
                    isActive = section.id === selectedSection.id
                }
                return <InfographicsSection
                    key={section.id}
                    section={{...section, isActive}}
                    handleToggleSelectSection={handleToggleSelectSection}
                    handleDeleteSection={handleDeleteSection}
                />
            })}
        </div>
    )
}

export default SectionRow;
