import {IInfographicsSection} from './IInfographicsSection'
import {ILayoutSection} from './ILayoutSection'

export interface IInfographicsDetails {
    width: string, // should contain "{width}"px
    sections: IInfographicsSection[],
    sectionLayout: ILayoutSection[][],
    columns: number,
}
