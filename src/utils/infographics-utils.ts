import {EColorUsage} from 'enums/EColorUsage'
import {IInfographicsDetails} from 'types/IInfographicsDetails'
import {IInfographicsRow} from 'types/IInfographicsSection'
import {ITheme} from 'types/ITheme'

export const getInfographicsStyle = (infographicsDetails: IInfographicsDetails, sizeRatio?: number) => {
    const {width} = infographicsDetails
    const {colors} = infographicsDetails.theme
    const ratio = sizeRatio ?? 1
    const style = {width: width / ratio}

    if (colors[EColorUsage.BACKGROUND].gradient) {
        const {type: gradientType, direction, colors: gradientColors} = colors[EColorUsage.BACKGROUND].gradient!
        return {
            ...style,
            backgroundImage: `${gradientType}(${direction},${gradientColors.map(color => ` ${color}`)})`,
        }
    }

    if (colors[EColorUsage.BACKGROUND].stripes) {
        return {
            ...style,
            backgroundColor: '#fff',
        }
    }

    return {
        ...style,
        backgroundColor: colors[EColorUsage.BACKGROUND].hex,
    }
}

export const generateColumnTemplate = (row: IInfographicsRow): string => {
    let template = ''
    row.sections.forEach(section => {
        template += `${section.widthPercent}% `
    })

    return template.trim()
}

export const getInfographicsRowStyle = (row: IInfographicsRow, theme: ITheme) => {
    const {sections, height} = row
    const {colors} = theme
    const style = {
        height: height,
        display: 'grid',
        gridTemplateColumns: generateColumnTemplate(row),
    }

    if (colors[EColorUsage.BACKGROUND].stripes) {
        return {
            ...style,
            backgroundColor: sections[0].position.y % 2 === 0
                ? colors[EColorUsage.BACKGROUND].stripes!.evenColorHex
                : colors[EColorUsage.BACKGROUND].stripes!.oddColorHex,
        }
    }

    return style
}
