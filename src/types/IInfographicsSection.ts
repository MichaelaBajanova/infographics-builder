// this interface describes infographics section and will be probably used for holding data
// interface describing layout of infographics can be found in ILayoutSection
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
    isActive: boolean,
}

export interface IInfographicsRow {
    height: number,
    sections: IInfographicsSection[],
    columns: number,
}
export type TInfographics = IInfographicsRow[]
