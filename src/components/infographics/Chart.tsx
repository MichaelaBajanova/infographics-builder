import React from 'react'
import TuiChart from 'tui-chart'
import {ColumnChart, PieChart} from '@toast-ui/react-chart'
import 'tui-chart/dist/tui-chart.css'
import {IChart} from 'types/IChart'
import {ITheme} from 'types/ITheme'
import {EColorUsage} from 'enums/EColorUsage'
import {EChartPlacement} from 'enums/EChartPlacement'
import {EChartType} from 'enums/EChartType'
import {INFOGRAPHICS_PREVIEW_RATIO} from 'constants/infographicsPreviewRatio'

interface IProps {
    chart: IChart,
    theme: ITheme,
    isUsedInBoardPreview?: boolean,
}

const Chart = (props: IProps) => {

    const {
        data,
        width,
        height,
        title,
        type,
        placement,
        xAxisTitle,
        yAxisTitle,
    } = props.chart
    const {theme: infographicsTheme, isUsedInBoardPreview} = props
    const {colors} = infographicsTheme
    const legendTextColor = placement === EChartPlacement.INFOGRAPHICS
        ? colors[EColorUsage.TEXT].hex
        : '#000'
    const tickColor = placement === EChartPlacement.INFOGRAPHICS
        ? colors[EColorUsage.TEXT].hex
        : '#000'
    const labelColor = placement === EChartPlacement.INFOGRAPHICS
        ? colors[EColorUsage.TEXT].hex
        : '#000'

    let chartTheme
    if (infographicsTheme) {
        chartTheme = {
            chart: {
                background: {
                    color: '#fff',
                    opacity: 0,
                }
            },
            title: {
                color: colors[EColorUsage.TEXT].hex,
                fontWeight: 'bold',
            },
            xAxis: {
                label: {
                    color: labelColor,
                },
                tickColor: tickColor,
            },
            yAxis: {
                label: {
                    color: labelColor,
                },
                tickColor: tickColor,
            },
            series: {
                colors: infographicsTheme && infographicsTheme.colors[EColorUsage.CHART].chartColors,
            },
            legend: {
                label: {
                    color: legendTextColor,
                },
            },
        }
        TuiChart.registerTheme(`${infographicsTheme.key}-THEME`, chartTheme)
    }

    const options = {
        chart: {
            width: isUsedInBoardPreview ? width / INFOGRAPHICS_PREVIEW_RATIO : width,
            height: isUsedInBoardPreview ? height / INFOGRAPHICS_PREVIEW_RATIO : height,
            title,
        },
        yAxis: {
            title: yAxisTitle,
        },
        xAxis: {
            title: xAxisTitle,
        },
        chartExportMenu: {
            visible: false,
        },
        theme: chartTheme ? `${infographicsTheme.key}-THEME` : undefined,
        legend: {
            visible: !isUsedInBoardPreview,
        },
    }

    if (data.series.length === 0) {
        return null
    }

    return (
        <div className={'scope__Chart'}>
            {type === EChartType.BAR_CHART
                ? (<ColumnChart
                    data={data}
                    options={options}
                />)
                : (<PieChart
                    data={data}
                    options={options}
                />)}
        </div>
    )
}

export default Chart
