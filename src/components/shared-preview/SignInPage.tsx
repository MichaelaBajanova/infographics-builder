import React from 'react'
import {connect} from 'react-redux'
import 'styles/shared-preview/SignInPage.scss'
import 'styles/shared-preview/SignInPage.scss'
import * as firebase from 'firebase'
import history from '../../history'
import {IUser} from 'types/IUser'
import {signIn} from 'ducks/auth/authActions'
import {ERoute} from 'enums/ERoute'

interface IDispatchProps {
    signIn: typeof signIn,
}

const mapDispatchToProps = {
    signIn,
}

interface IProps extends IDispatchProps {}

class SignInPage extends React.Component<IProps> {

    provider

    componentDidMount() {
        this.provider = new firebase.auth.GoogleAuthProvider()
    }

    render() {
        return (
            <div className={'scope__SignInPage'}>
                <div className={'container'}>
                    <div className={'text'}>Please, sign in to view infographics.</div>
                    <button className={'sign-in-button'} onClick={this.handleSignIn}>Sign in</button>
                </div>
            </div>
        )
    }

    private handleSignIn = (event: any) => {
        event.preventDefault()
        const {signIn} = this.props

        firebase.auth().signInWithPopup(this.provider).then((result) => {
            if (result.user) {
                const {uid, displayName, email, photoURL} = result.user
                const user: IUser = {
                    uid,
                    displayName,
                    email,
                    photoURL,
                }
                signIn(user)
            }
        }).catch(() => {
            history.push(ERoute.ERROR)
        })
    }
}

export default connect(null, mapDispatchToProps)(SignInPage)
