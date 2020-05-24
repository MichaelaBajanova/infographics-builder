import React from 'react'
import 'styles/tools-menu/ChartTypePicker.scss'
import Icon from 'components/ui/Icon'
import {IInfographicsSection} from 'types/IInfographicsSection'
import {EIconName, EIconSize, EIconType} from 'enums/EIconName'
import {EChartType} from 'enums/EChartType'

interface IProps {
    selectedSection: IInfographicsSection | null,
    openChartModal: (type: EChartType) => void,
    closeChartMenu: () => void,
}

const ChartTypePicker = (props: IProps) => {
    const {openChartModal} = props

    const onBarChartClick = () => {
        const {closeChartMenu} = props
        closeChartMenu()
        openChartModal(EChartType.BAR_CHART)
    }

    const onPieChartClick = () => {
        const {closeChartMenu} = props
        closeChartMenu()
        openChartModal(EChartType.PIE_CHART)
    }

    return (
        <div className={'scope__ChartTypePicker'}>
            <ul>
                <li onClick={onBarChartClick}>
                    <Icon name={EIconName.BAR_CHART} type={EIconType.SOLID} size={EIconSize.MEDIUM} />
                    <div>Bar chart</div>
                </li>
                <li onClick={onPieChartClick}>
                    <Icon name={EIconName.PIE_CHART} type={EIconType.SOLID} size={EIconSize.MEDIUM} />
                    <div>Pie chart</div>
                </li>
            </ul>
        </div>
    )
}

export default ChartTypePicker
