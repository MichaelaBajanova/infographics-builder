import React from 'react'
import 'styles/shared-preview/SharedPreview.scss'
import {connect} from 'react-redux'
import {RouteProps} from 'react-router'
import Infographics from 'components/infographics/Infographics'
import {IInfographicsDetails} from 'types/IInfographicsDetails'
import {IUser} from 'types/IUser'
import * as firebase from 'firebase'
import {signIn, signOut} from 'ducks/auth/authActions'
import LoadingScreen from 'components/common/LoadingScreen'
import SignInPage from 'components/shared-preview/SignInPage'
import {loadInfographics, setInfographics} from 'ducks/shared-preview/sharedPreviewActions'
import {EShareOptions} from 'enums/EShareOptions'

interface IStateProps {
    infographics: IInfographicsDetails | null,
    isSignedIn: boolean | null,
    user: IUser | null,
}

interface IDispatchProps {
    loadInfographics: typeof loadInfographics,
    setInfographics: typeof setInfographics,
    signIn: typeof signIn,
    signOut: typeof signOut,
}

interface IProps extends IStateProps, IDispatchProps {}

const mapStateToProps = (state) => {
    return {
        infographics: state.preview.infographics,
        isSignedIn: state.auth.isSignedIn,
        user: state.auth.user,
    }
}

const mapDispatchToProps = {
    loadInfographics,
    setInfographics,
    signIn,
    signOut,
}

class SharedPreview extends React.Component<IProps & RouteProps> {

    componentDidMount() {
        const {loadInfographics, match, infographics} = this.props

        this.onAuthChange()
        if (!infographics) {
            loadInfographics(match.params.id)
        }
    }

    componentWillUnmount() {
        this.props.setInfographics(null)
    }

    render() {
        const {infographics, isSignedIn} = this.props

        if (isSignedIn === null || !infographics) {
            return <LoadingScreen />
        }

        if (!isSignedIn) {
            return <SignInPage />
        }

        const {shareWith} = infographics.sharingOptions
        const {userId} = infographics
        const {email: userEmail, uid} = this.props.user

        if (shareWith === EShareOptions.ONLY_ME && userId !== uid) {
            return <div>You don't have rights to view this infographics.</div>
        }

        if (shareWith === EShareOptions.CUSTOM) {
            const emailFound = infographics.sharingOptions.customEmails.find(email => {
                return email.toLowerCase() === userEmail.toLowerCase()
            })

            if (!emailFound && userId !== uid) {
                return (
                    <div>You don't have rights to view this infographics.</div>
                )
            }
        }

        return (
            <div className={'scope__SharedPreview'}>
                <Infographics
                    infographicsDetails={infographics}
                    isInteractive={false}
                    selectedSection={null}
                />
            </div>
        )
    }

    private onAuthChange = () => {
        const {signIn, signOut} = this.props
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                const {uid, displayName, email, photoURL} = user
                signIn({
                    uid,
                    displayName,
                    email,
                    photoURL,
                })
            } else {
                signOut()
            }
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SharedPreview)
