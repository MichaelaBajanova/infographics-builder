import React from 'react'
import Modal from 'components/ui/Modal'
import Input from 'components/ui/Input'
import SeriesInput from 'components/modals/chart-modal/SeriesInput'
import Chart from 'components/infographics/Chart'
import {IChart, IChartSeries} from 'types/IChart'
import {ITheme} from 'types/ITheme'
import {EModalSize} from 'enums/EModalSize'
import {EChartType} from 'enums/EChartType'

interface IProps {
    addSeries: (event: any, series: IChartSeries) => void,
    chart: IChart,
    deleteSeries: (seriesIndex: number) => void,
    onCancelButtonClick: () => void,
    onCreateButtonClick: () => void,
    onTitleFormSubmit: (event: any) => void,
    onTitleInputChange: (event: any) => void,
    titleInputValue: string,
    theme: ITheme,
}

const CreateBarChartModal = (props: IProps) => {

    const {
        addSeries,
        chart,
        deleteSeries,
        onCancelButtonClick,
        onCreateButtonClick,
        onTitleFormSubmit,
        onTitleInputChange,
        titleInputValue,
        theme,
    } = props
    const {series} = chart.data
    const isCreateButtonDisabled = series.length === 0

    return (
        <div className={'scope__CreateBarChartModal'}>
            <Modal
                headerText={'Create Bar Chart'}
                isSubmitButtonDisabled={isCreateButtonDisabled}
                onCancelButtonClick={onCancelButtonClick}
                onSubmitButtonClick={onCreateButtonClick}
                size={EModalSize.SMALL}
                submitButtonText={'Create'}
            >
                {
                    <>
                        <div className={'chart-settings'}>
                            <h2>Title</h2>
                            <form autoComplete={'off'} onSubmit={onTitleFormSubmit}>
                                <div className={'title-input'}>
                                    <Input
                                        id={'title'}
                                        type={'text'}
                                        placeholder={'e.g. Fiction Book Sales'}
                                        value={titleInputValue}
                                        onChange={onTitleInputChange}
                                    />
                                </div>
                            </form>
                            <SeriesInput
                                chartType={EChartType.BAR_CHART}
                                series={series}
                                seriesDescription={'Bars'}
                                placeholders={{
                                    name: 'e.g. Sci-Fi & Fantasy',
                                    data: 'e.g. 1000'
                                }}
                                addSeries={addSeries}
                                deleteSeries={deleteSeries}
                            />
                        </div>
                        <div className={'chart-preview'}>
                            <Chart
                                chart={chart}
                                theme={theme}
                            />
                        </div>
                    </>
                }
            </Modal>
        </div>
    )
}

export default CreateBarChartModal
