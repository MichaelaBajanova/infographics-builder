import {IInfographicsDetails} from 'types/IInfographicsDetails'
import {LOAD_ALL_INFOGRAPHICS, SELECT_INFOGRAPHICS, UNSELECT_INFOGRAPHICS} from 'ducks/board/boardActionTypes'

interface IState {
    infographicsList: IInfographicsDetails[] | null,
    selectedInfographics: IInfographicsDetails | null,
}

const INITIAL_STATE: IState = {
    infographicsList: null,
    selectedInfographics: null,
}

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case LOAD_ALL_INFOGRAPHICS:
            const infographicsList = action.payload ? [...action.payload] : null
            return {...state, infographicsList}
        case SELECT_INFOGRAPHICS:
            return {...state, selectedInfographics: action.payload}
        case UNSELECT_INFOGRAPHICS:
            return {...state, selectedInfographics: null}
        default:
            return state
    }
}
