import {IInfographicsDetails} from 'types/IInfographicsDetails'
import * as firebase from 'firebase'
import {SET_INFOGRAPHICS} from 'ducks/shared-preview/sharedPreviewActionTypes'

export const setInfographics = (infographics: IInfographicsDetails | null) => {
    return {
        type: SET_INFOGRAPHICS,
        payload: infographics,
    }
}

export const loadInfographics = (id: string) => async (dispatch) => {
    let infographics: IInfographicsDetails | null = null

    const snapshot = await firebase.database().ref(`/infographics/${id}`).once('value')
    infographics = snapshot.val()

    dispatch(setInfographics(infographics))
}
