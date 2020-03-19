import {IUser} from 'types/IUser'
import {SIGN_IN, SIGN_OUT} from 'ducks/auth/authActionTypes'
import history from '../../history'

export const signIn = (user: IUser, redirect?: boolean) => {
    if (redirect) {
        history.push('/app')
    }

    return {
        type: SIGN_IN,
        payload: user,
    }
}

export const signOut = (redirect?: boolean) => {
    if (redirect) {
        history.push('/')
    }

    return {
        type: SIGN_OUT,
    }
}
