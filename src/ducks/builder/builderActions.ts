import {IInfographicsDetails} from 'types/IInfographicsDetails'
import {SET_INFOGRAPHICS} from 'ducks/builder/builderActionTypes'
import * as firebase from 'firebase'
import history from '../../history'
import {ERoute} from 'enums/ERoute'

export const setInfographics = (infographics: IInfographicsDetails | null) => {
    return {
        type: SET_INFOGRAPHICS,
        payload: infographics,
    }
}

export const loadInfographics = (id: string) => async (dispatch) => {
    let infographics: IInfographicsDetails | null = null

    const invalidCharacters = ['.', '#', '$', '[', ']']
    const hasInvalidCharacters = invalidCharacters.some(char => id.includes(char))
    if (hasInvalidCharacters) {
        history.push(ERoute.ERROR)
        return
    }

    const snapshot = await firebase.database().ref(`/infographics/${id}`).once('value',
        () => {},
        () => {
            history.push(ERoute.ERROR)
        }
    )
    infographics = snapshot.val()

    dispatch(setInfographics(infographics))
}
