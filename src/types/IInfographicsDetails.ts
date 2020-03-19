import {TInfographics} from './IInfographicsSection'
import {ITheme} from './ITheme'
import {ISharingOptions} from 'types/ISharingOptions'

export interface IInfographicsDetails {
    id: string | null,
    userId: string,
    width: number,
    theme: ITheme,
    sharingOptions: ISharingOptions,
    infographics: TInfographics,
    nextSectionId: number,
}
