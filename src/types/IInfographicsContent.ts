import {IChart} from 'types/IChart'
import {ITimeline} from 'types/ITimeline'

export interface IInfographicsContent {
    chart?: IChart,
    timeline?: ITimeline,
    textWithHtml?: string,
    title?: string,
}
