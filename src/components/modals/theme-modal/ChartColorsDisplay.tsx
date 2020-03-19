import React from 'react'
import 'styles/modals/theme-modal/ChartColorsDisplay.scss'

interface IProps {
    chartColors: string[],
}

const ChartColorsDisplay = (props: IProps) => {

    const {chartColors} = props

    return (
        <div className={'scope__ChartColorsDisplay'}>
            <div className={'chart-colors-text'}>Chart colors:</div>
            {chartColors.map((colorHex, index) => {
                const style = {
                    backgroundColor: colorHex,
                }
                return <li className={'chart-color'} key={index} style={style} />
            })}
        </div>
    )
}

export default ChartColorsDisplay
