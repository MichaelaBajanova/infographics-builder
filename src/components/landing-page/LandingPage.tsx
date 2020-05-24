import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import * as firebase from 'firebase'
import history from '../../history'
import 'styles/landing-page/LandingPage.scss'
import {signIn, signOut} from 'ducks/auth/authActions'
import {IUser} from 'types/IUser'
import {ERoute} from 'enums/ERoute'

interface IStateProps {
    isSignedIn: boolean | null,
}

interface IDispatchProps {
    signIn: (user: IUser, redirect?: boolean) => void,
    signOut: () => void,
}

interface IProps extends IStateProps, IDispatchProps {}

const mapStateToProps = (state) => {
    return {
        isSignedIn: state.auth.isSignedIn,
    }
}

const mapDispatchToProps = {
    signIn,
    signOut,
}

class LandingPage extends React.Component<IProps> {

    provider

    componentDidMount() {
        this.provider = new firebase.auth.GoogleAuthProvider()
        this.onAuthChange()
    }

    render() {
        return (
            <div className={'scope__LandingPage'}>
                <div className={'header'}>
                    <div className={'header__auth-button'}>
                        {this.renderAuthButton()}
                    </div>
                </div>
                <div className={'intro'}>
                    <div className={'intro__text'}>
                        <h1 className={'intro__title'}>Infographics Builder</h1>
                        <div className={'intro__description'}>
                            Build your own interactive infographics. It's fast and simple - just create a layout, pick
                            a theme and add your content.
                        </div>
                        {this.renderGetStartedButton()}
                    </div>
                    <div className={'intro__illustration'} />
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path fill="#211844" fillOpacity="1" d="M0,32L80,69.3C160,107,320,181,480,181.3C640,181,800,107,960,74.7C1120,43,1280,53,1360,58.7L1440,64L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path>
                </svg>
                <div className={'features'}>
                    <div className={'feature'}>
                        <div className={'feature__charts-illustration'} />
                        <div className={'feature__charts-text'}>
                            <h2 className={'feature__charts-title'}>Visualize your data with charts</h2>
                            <div className={'feature__charts-description'}>
                                Add interactive charts to your infographics and share all the important data.
                            </div>
                        </div>
                    </div>
                    <div className={'feature'}>
                        <div className={'feature__themes-illustration'} />
                        <div className={'feature__themes-text'}>
                            <h2 className={'feature__themes-title'}>Improve your infographics with a color theme</h2>
                            <div className={'feature__themes-description'}>
                                Choose from predefined themes and style your infographics. The selected theme will
                                influence colors, fonts or background style.
                            </div>
                        </div>
                    </div>

                    <div className={'feature'}>
                        <div className={'feature__share-illustration'} />
                        <div className={'feature__share-text'}>
                            <h2 className={'feature__share-title'}>Share your infographics with friends</h2>
                            <div className={'feature__share-description'}>
                                Click a share button, copy the link and share it with the world.
                            </div>
                        </div>
                    </div>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className={'wave'}>
                    <path fill="#211844" fillOpacity="1" d="M0,32L80,69.3C160,107,320,181,480,181.3C640,181,800,107,960,74.7C1120,43,1280,53,1360,58.7L1440,64L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
                </svg>
            </div>
        )
    }

    renderAuthButton() {
        const {isSignedIn} = this.props

        if (isSignedIn === null) {
            return null
        }

        if (isSignedIn) {
            return (
                <button onClick={this.handleSignOut}>Sign out</button>
            )
        } else {
            return (
                <button onClick={this.handleSignInWithRedirect}>Sign in</button>
            )
        }
    }

    renderGetStartedButton() {
        const {isSignedIn} = this.props
        const className = 'intro__get-started-button'
        const buttonText = 'GET STARTED'

        if (isSignedIn === null) {
            return null
        }

        if (isSignedIn) {
            return (
                <Link to={ERoute.BOARD}>
                    <button className={className}>
                        {buttonText}
                    </button>
                </Link>
            )
        }

        return (
            <button className={className} onClick={this.handleSignInWithRedirect}>{buttonText}</button>
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

    private handleSignInWithRedirect = (event: any) => {
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
                signIn(user, true)
            }
        }).catch(() => {
            history.push(ERoute.ERROR)
        })
    }

    private handleSignOut = (event: any) => {
        event.preventDefault()
        const {signOut} = this.props

        firebase.auth().signOut().then(() => {
            signOut()
        }).catch(() => {
            history.push(ERoute.ERROR)
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage)
