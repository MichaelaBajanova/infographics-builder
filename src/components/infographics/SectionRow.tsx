import React from 'react'
import 'styles/infographics/SectionRow.scss'
import InfographicsSection from 'components/infographics/InfographicsSection'
import {IInfographicsRow, IInfographicsSection} from 'types/IInfographicsSection'
import {ITheme} from 'types/ITheme'
import InfographicsRowBackground from 'components/infographics/InfographicsRowBackground'
import {EStripeStyle} from 'enums/EStripeStyle'
import {getInfographicsRowStyle} from 'utils/infographics-utils'

interface IProps {
    deleteSection?: (section: IInfographicsSection) => void,
    isInteractive: boolean,
    row: IInfographicsRow,
    selectedSection: IInfographicsSection | null,
    theme: ITheme,
    updateSelectedSection?: (section: IInfographicsSection | null) => void,
}

const SectionRow = (props: IProps) => {
    const {
        deleteSection,
        isInteractive,
        row,
        selectedSection,
        theme,
        updateSelectedSection,
    } = props
    const {sections} = row
    const style = getInfographicsRowStyle(row, theme)

    return (
        <div className={'section-row'} style={style}>
            {
                theme.stripeStyle === EStripeStyle.WAVY &&
                <InfographicsRowBackground
                    theme={theme}
                    odd={sections[0].position.y % 2 === 1}
                />
            }
            {sections.map(section => {
                let isActive = false
                if (selectedSection) {
                    isActive = section.id === selectedSection.id
                }
                return <InfographicsSection
                    key={section.id}
                    deleteSection={deleteSection}
                    isInteractive={isInteractive}
                    section={{...section, isActive}}
                    theme={theme}
                    updateSelectedSection={updateSelectedSection}
                />
            })}
        </div>
    )
}

export default SectionRow
