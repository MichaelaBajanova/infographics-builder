import React from 'react'
import 'styles/infographics/SectionRow.scss'
import {IInfographicsRow} from 'types/IInfographicsSection'
import {ITheme} from 'types/ITheme'
import {EColorUsage} from 'enums/EColorUsage'
import InfographicsRowBackground from 'components/infographics/InfographicsRowBackground'
import {EStripeStyle} from 'enums/EStripeStyle'
import InfographicsSectionPreview from 'components/board/InfographicsSectionPreview'
import {INFOGRAPHICS_PREVIEW_RATIO} from 'constants/infographicsPreviewRatio'

interface IProps {
    row: IInfographicsRow,
    theme: ITheme,
}

const SectionRowPreview = (props: IProps) => {
    const {row, theme} = props
    const {sections, height} = row
    const {colors} = theme

    const generateColumnTemplate = (): string => {
        let template = ''
        row.sections.forEach(section => {
            template += `${section.widthPercent}% `
        })

        return template.trim()
    }

    let style
    if (theme.colors[EColorUsage.BACKGROUND].stripes) {
        style = {
            height: height / INFOGRAPHICS_PREVIEW_RATIO,
            display: 'grid',
            gridTemplateColumns: generateColumnTemplate(),
            backgroundColor: sections[0].position.y % 2 === 0
                ? colors[EColorUsage.BACKGROUND].stripes!.evenColorHex
                : colors[EColorUsage.BACKGROUND].stripes!.oddColorHex,
        }
    } else {
        style = {
            height: height / INFOGRAPHICS_PREVIEW_RATIO,
            display: 'grid',
            gridTemplateColumns: generateColumnTemplate(),
        }
    }

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
                return <InfographicsSectionPreview
                    key={section.id}
                    section={{...section, isActive}}
                    theme={theme}
                />
            })}
        </div>
    )
}

export default SectionRowPreview
