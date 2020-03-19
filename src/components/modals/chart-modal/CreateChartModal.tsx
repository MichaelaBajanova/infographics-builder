import React from 'react'
import 'styles/modals/chart-modal/CreateChartModal.scss'
import produce from 'immer'
import CreateBarChartModal from 'components/modals/chart-modal/CreateBarChartModal'
import CreatePieChartModal from 'components/modals/chart-modal/CreatePieChartModal'
import {IInfographicsSection} from 'types/IInfographicsSection'
import {IChart, IChartData, IChartSeries} from 'types/IChart'
import {ITheme} from 'types/ITheme'
import {EChartType} from 'enums/EChartType'
import {EChartPlacement} from 'enums/EChartPlacement'
import {IInfographicsContent} from 'types/IInfographicsContent'

interface IProps {
    infographicsSectionChart?: IChart,
    addContent: (section: IInfographicsSection, content: IInfographicsContent) => void,
    chartType: EChartType,
    closeChartModal: (type: EChartType) => void,
    selectedSection: IInfographicsSection,
    theme: ITheme,
}

interface IState {
    chart: IChart,
    titleInputValue: string,
}

class CreateChartModal extends React.Component<IProps, IState> {
    state: IState = {
        chart: {
            width: 250,
            height: 200,
            type: this.props.chartType,
            placement: EChartPlacement.CHART_MODAL,
            data: (this.props.infographicsSectionChart && this.props.infographicsSectionChart.data)
                ? this.props.infographicsSectionChart.data
                : {
                    series: [] as IChartSeries[],
                } as IChartData,
        },
        titleInputValue: (this.props.infographicsSectionChart && this.props.infographicsSectionChart.title)
                ? this.props.infographicsSectionChart.title
                : '',
    }

    render() {
        const {chartType, theme} = this.props
        const {chart, titleInputValue} = this.state

        if (chartType === EChartType.BAR_CHART) {
            return <CreateBarChartModal
                addSeries={this.handleAddSeries}
                chart={chart}
                deleteSeries={this.handleDeleteSeries}
                onCancelButtonClick={this.onCancelButtonClick}
                onCreateButtonClick={this.onCreateButtonClick}
                onTitleFormSubmit={this.onTitleFormSubmit}
                onTitleInputChange={this.onTitleInputChange}
                titleInputValue={titleInputValue}
                theme={theme}
            />
        }
        if (chartType === EChartType.PIE_CHART) {
            return <CreatePieChartModal
                addSeries={this.handleAddSeries}
                chart={chart}
                deleteSeries={this.handleDeleteSeries}
                onCancelButtonClick={this.onCancelButtonClick}
                onCreateButtonClick={this.onCreateButtonClick}
                onTitleFormSubmit={this.onTitleFormSubmit}
                onTitleInputChange={this.onTitleInputChange}
                titleInputValue={titleInputValue}
                theme={theme}
            />
        }
    }

    private onTitleFormSubmit = (event: any) => {
        event.preventDefault()
    }

    private onTitleInputChange = (event: any) => {
        if (event.target.value.length > 64) {
            return
        }

        this.setState({
            titleInputValue: event.target.value
        })
    }

    private handleAddSeries = (event: any, series: IChartSeries) => {
        event.preventDefault()
        this.setState(produce(this.state, draftState => {
            draftState.chart.data.series = [...this.state.chart.data.series, series]
        }))
    }

    private handleDeleteSeries = (seriesIndex: number) => {
        const {series} = this.state.chart.data

        let seriesCopy: IChartSeries[] = [...series]
        seriesCopy = produce(seriesCopy, draft => {
            draft.splice(seriesIndex, 1)
        })

        this.setState(produce(this.state, draftState => {
            draftState.chart.data.series = seriesCopy
        }))
    }

    private onCreateButtonClick = () => {
        const {chartType, addContent, selectedSection, closeChartModal} = this.props
        let {chart, titleInputValue} = this.state

        chart = produce(chart, draft => {
            if (titleInputValue !== '') {
                draft.title = titleInputValue
            }
            draft.placement = EChartPlacement.INFOGRAPHICS
            draft.width = selectedSection.widthPx - 10
            draft.height = selectedSection.heightPx - 10
        })

        const infographicsContent: IInfographicsContent = {
            chart,
        }

        addContent(selectedSection, infographicsContent)
        closeChartModal(chartType)
    }

    private onCancelButtonClick = () => {
        const {chartType, closeChartModal} = this.props
        closeChartModal(chartType)
    }
}

export default CreateChartModal
