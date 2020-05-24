import {IInfographicsDetails} from 'types/IInfographicsDetails'

export interface IInfographicsHistory {
    currentStateIndex: number,
    infographicsStates: IInfographicsDetails[],
}
