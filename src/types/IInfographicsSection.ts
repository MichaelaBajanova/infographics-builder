import {IInfographicsContent} from 'types/IInfographicsContent'

export interface IInfographicsSection {
    id: number,
    position: {
        x: number,
        y: number,
    },
    column: {
        start: number,
        end: number,
    },
    widthPercent: number,
    widthPx: number,
    heightPx: number,
    isActive: boolean,
    content?: IInfographicsContent,
}

export interface IInfographicsRow {
    height: number,
    sections: IInfographicsSection[],
    columns: number,
}
export type TInfographics = IInfographicsRow[]
