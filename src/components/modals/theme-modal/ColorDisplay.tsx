import React from 'react'
import 'styles/modals/theme-modal/ColorDisplay.scss'
import {IColor} from 'types/ITheme'
import {EColorUsage} from 'enums/EColorUsage'
import {EColorType} from 'enums/EColorType'
import ChartColorsDisplay from 'components/modals/theme-modal/ChartColorsDisplay'

interface IProps {
    color: IColor,
}

const ColorDisplay = (props: IProps) => {

    const {hex, gradient, stripes, chartColors, usage, type: colorType , typeTextColor} = props.color

    if (usage === EColorUsage.TEXT) {
        return null
    }

    let colorStyle
    if (colorType === EColorType.GRADIENT && gradient) {
        const {type: gradientType, direction, colors} = gradient

        colorStyle = {
            backgroundImage: `${gradientType}(${direction},${colors.map(color => ` ${color}`)})`,
        }

    } else if (colorType === EColorType.STRIPES && stripes) {
        const {oddColorHex, evenColorHex} = stripes

        colorStyle = {
            backgroundRepeat: 'no-repeat',
            backgroundImage: `linear-gradient(${oddColorHex}, ${oddColorHex}), linear-gradient(${evenColorHex}, ${evenColorHex})`,
            backgroundSize: '100% 50%, 100% 50%',
            backgroundPosition: '0 0, 0 100%',
        }
    } else {
        colorStyle = {
            backgroundColor: hex,
        }
    }

    const usageStyle = {
        color: typeTextColor,
    }
    
    if (chartColors) {
        return (
            <ChartColorsDisplay chartColors={chartColors}/>
        )
    }

    return (
        <div className={'scope__ColorDisplay'}>
            <div className={'color'} style={colorStyle}>
                <span className={'color-usage'} style={usageStyle}>{usage}</span>
            </div>
        </div>
    )
}

export default ColorDisplay
