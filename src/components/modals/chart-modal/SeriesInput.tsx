import React from 'react'
import 'styles/modals/chart-modal/SeriesInput.scss'
import Input from 'components/ui/Input'
import Icon from 'components/ui/Icon'
import {IChartSeries} from 'types/IChart'
import {EIconName, EIconType} from 'enums/EIconName'
import {EChartType} from 'enums/EChartType'

interface IProps {
    chartType: EChartType,
    series: IChartSeries[],
    seriesDescription: string,
    placeholders: {name: string, data: string},
    addSeries: (event: any, series: IChartSeries) => void,
    deleteSeries: (seriesIndex: number) => void,
}

interface IState {
    nameInputValue: string,
    dataInputValue: string,
}

class SeriesInput extends React.Component<IProps, IState> {
    state: IState = {
        nameInputValue: '',
        dataInputValue: '',
    }

    render() {
        const {nameInputValue, dataInputValue} = this.state
        const {series, seriesDescription, placeholders} = this.props
        const {name: namePlaceholder, data: dataPlaceholder} = placeholders

        return (
            <div className={'scope__SeriesInput'}>
                <h2>{seriesDescription}</h2>
                <ul>
                    {series.map((serie, index) => {
                        return (
                            <li key={index} className={`graph-series graph-series-${index}`}>
                                <span
                                    className={`graph-series__value graph-series-${index}__value`}
                                >
                                    {`${serie.name}: ${serie.data}`}
                                </span>
                                <span
                                    className={`graph-series__delete graph-series-${index}__delete`}
                                    onClick={this.onDeleteSeriesClick}
                                >
                                    <Icon name={EIconName.CLEAR} type={EIconType.SOLID}/>
                                </span>
                            </li>
                        )
                    })}
                </ul>
                <form autoComplete={'off'}>
                    <Input
                        id={'name'}
                        type={'text'}
                        onChange={this.onNameInputChange}
                        value={nameInputValue}
                        placeholder={namePlaceholder}
                    />
                    <Input
                        id={'data'}
                        type={'text'}
                        onChange={this.onDataInputChange}
                        onKeyPress={this.onDataKeyPress}
                        value={dataInputValue}
                        placeholder={dataPlaceholder}
                    />
                    <button onClick={this.onAddSeriesButtonClick}><Icon type={EIconType.SOLID} name={EIconName.ADD}/></button>
                </form>
            </div>
        )
    }

    private onAddSeriesButtonClick = (event: any) => {
        const {addSeries} = this.props
        const {nameInputValue, dataInputValue} = this.state
        addSeries(event, {
            name: nameInputValue,
            data: [Number(dataInputValue)],
        } as IChartSeries)

        this.setState({
            nameInputValue: '',
            dataInputValue: '',
        })
    }

    private onDeleteSeriesClick = (event: any) => {
        const {deleteSeries} = this.props
        const targetClass = event.target.parentNode.parentNode.className
        const indexPositionStart = targetClass.lastIndexOf('-') + 1
        const indexPositionEnd = targetClass.length
        const index = Number(targetClass.slice(indexPositionStart, indexPositionEnd))

        deleteSeries(index)
    }

    private onNameInputChange = (event: any) => {
        if (event.target.value.length > 20) {
            return
        }

        this.setState({
            nameInputValue: event.target.value,
        })
    }

    private onDataInputChange = (event: any) => {
        if (event.target.value.length > 10) {
            return
        }

        this.setState({
            dataInputValue: event.target.value,
        })
    }

    private onDataKeyPress = (event: any) => {
        const {chartType} = this.props
        const {dataInputValue} = this.state
        const regex = chartType === EChartType.BAR_CHART ? /[-0-9.]/g : /[0-9.]/g

        if (event.key === 'Enter') {
            return
        }

        const keyIsMinus = event.key === '-'
        const containsMinus = dataInputValue.includes('-')
        const keyIsDot = event.key === '.'
        const containsDot = dataInputValue.includes('.')

        if (!String(event.key).match(regex) ||
            (keyIsMinus && containsMinus) ||
            (keyIsMinus && dataInputValue.length !== 0) ||
            (keyIsDot && containsDot) ||
            (keyIsDot && dataInputValue.length === 0) ||
            (keyIsDot && dataInputValue === '-')
        ) {
            event.preventDefault()
        }
    }
}

export default SeriesInput
