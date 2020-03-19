import {EChartType} from '../enums/EChartType'
import {EChartPlacement} from '../enums/EChartPlacement'

export interface IChartSeries {
    name: string,
    data: number[],
}

export interface IChartData {
    categories?: string[],
    series: IChartSeries[],
}

export interface IChart {
    sectionId?: number,
    type: EChartType,
    placement: EChartPlacement,
    title?: string,
    data: IChartData,
    width: number,
    height: number,
    xAxisTitle?: string,
    yAxisTitle?: string,
}
