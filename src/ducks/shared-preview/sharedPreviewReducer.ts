import {IInfographicsDetails} from 'types/IInfographicsDetails'
import {SET_INFOGRAPHICS} from 'ducks/shared-preview/sharedPreviewActionTypes'

interface IState {
    infographics: IInfographicsDetails | null,
}

const INITIAL_STATE: IState = {
    infographics: null,
}

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case SET_INFOGRAPHICS:
            const infographics = action.payload ? {...action.payload} : null
            return {...state, infographics}
        default:
            return state
    }
}
