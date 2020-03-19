import {IInfographicsDetails} from 'types/IInfographicsDetails'
import * as firebase from 'firebase'
import {
    LOAD_ALL_INFOGRAPHICS,
    SELECT_INFOGRAPHICS,
    UNSELECT_INFOGRAPHICS,
} from 'ducks/board/boardActionTypes'

export const loadAllInfographics = (userId: string) => async (dispatch) => {
    let infographicsList: IInfographicsDetails[] = [] as IInfographicsDetails[]

    const snapshot = await firebase.database().ref(`/user/${userId}`).once('value')
    snapshot.forEach(infographics => {
        if (!infographics.val().sharingOptions.customEmails) {
            infographicsList.push({
                ...infographics.val(),
                sharingOptions: {
                    ...infographics.val().sharingOptions,
                    customEmails: [] as string[],
                }
            })
        } else {
            infographicsList.push(infographics.val())
        }
    })

    dispatch({
        type: LOAD_ALL_INFOGRAPHICS,
        payload: infographicsList,
    })
}

export const deleteInfographics = (userId: string, infographicsId: string) => async (dispatch) => {
    const updates = {}
    updates[`/infographics/${infographicsId}`] = null
    updates[`/user/${userId}/${infographicsId}`] = null

    await firebase.database().ref().update(updates)

    dispatch(loadAllInfographics(userId))
}

export const selectInfographics = (infographics: IInfographicsDetails) => {
    return {
        type: SELECT_INFOGRAPHICS,
        payload: infographics,
    }
}

export const unselectInfographics = () => {
    return {
        type: UNSELECT_INFOGRAPHICS,
    }
}
