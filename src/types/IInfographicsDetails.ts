import {IInfographicsSection} from './IInterfaceSection'
import {ILayoutSection} from './ILayoutSection'

export interface IInfographicsDetails {
    width: string,
    sections: IInfographicsSection[],
    sectionLayout: ILayoutSection[][],
}
