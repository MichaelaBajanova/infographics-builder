import React from 'react'
import * as firebase from 'firebase'
import {connect} from 'react-redux'
import {RouteProps} from 'react-router'
import 'styles/builder/InfographicsBuilder.scss'
import InfographicsBuilderHeader from 'components/builder/InfographicsBuilderHeader'
import Content from 'components/builder/Content'
import {IInfographicsHistory} from 'types/IInfographicsHistory'
import {IInfographicsSection, TInfographics} from 'types/IInfographicsSection'
import {IInfographicsDetails} from 'types/IInfographicsDetails'
import {signIn, signOut} from 'ducks/auth/authActions'
import {IUser} from 'types/IUser'
import LoadingScreen from 'components/common/LoadingScreen'
import PageNotFoundScreen from 'components/common/PageNotFoundScreen'
import {loadInfographics, setInfographics} from 'ducks/builder/builderActions'
import Notification from 'components/ui/Notification'
import {THEMES} from 'constants/themes'
import {ETheme} from 'enums/ETheme'
import {EShareOptions} from 'enums/EShareOptions'

interface IStateProps {
    infographics: IInfographicsDetails | null,
    isSignedIn: boolean | null,
    user: IUser,
}

interface IDispatchProps {
    loadInfographics: typeof loadInfographics,
    setInfographics: typeof setInfographics,
    signIn: typeof signIn,
    signOut: typeof signOut,
}

interface IProps extends IStateProps, IDispatchProps {}

interface IState {
    infographicsHistory: IInfographicsHistory,
    selectedSection: IInfographicsSection | null,
    isSavedNotificationDisplayed: boolean,
}

const mapStateToProps = (state) => {
    return {
        infographics: state.builder.infographics,
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

class InfographicsBuilder extends React.Component<IProps & RouteProps, IState> {

    state: IState = {
        infographicsHistory: {
            currentStateIndex: 0,
            infographicsStates: [],
        },
        selectedSection: null,
        isSavedNotificationDisplayed: false,
    }

    database

    componentDidMount() {
        const {infographicsHistory} = this.state
        const {loadInfographics, match, infographics} = this.props
        this.database = firebase.database()
        this.onAuthChange()

        if (!infographics) {
            if (match.params.id) {
                loadInfographics(match.params.id)
            }
        } else {
            this.setState({
                infographicsHistory: {
                    ...infographicsHistory,
                    infographicsStates: [
                        {...infographics},
                    ],
                },
            })
        }
    }

    componentWillUnmount() {
        this.props.setInfographics(null)
    }

    componentDidUpdate(prevProps) {
        const {infographicsHistory} = this.state
        const {infographics, match, isSignedIn, setInfographics} = this.props

        if (!infographics && !match.params.id && isSignedIn) {
            const {uid} = this.props.user
            setInfographics({
                id: null,
                userId: uid,
                width: 800,
                theme: THEMES[ETheme.GRAY_TONES],
                sharingOptions: {
                    shareWith: EShareOptions.ONLY_ME,
                    customEmails: [] as string[],
                },
                infographics: [] as TInfographics,
                nextSectionId: 0,
            })
        }

        if (!prevProps.infographics && infographics) {
            this.setState({
                infographicsHistory: {
                    ...infographicsHistory,
                    infographicsStates: [
                        {...infographics},
                    ],
                },
            })
        }
    }

    render () {
        const {isSignedIn} = this.props
        const {selectedSection, isSavedNotificationDisplayed} = this.state
        const {currentStateIndex, infographicsStates} = this.state.infographicsHistory

        if (isSignedIn === null || !infographicsStates[currentStateIndex]) {
            return <LoadingScreen />
        }

        if (!isSignedIn) {
            return <PageNotFoundScreen />
        }

        return (
            <div className={'scope__InfographicsBuilder'}>
                <Notification content={'Infographics has been saved.'} isVisible={isSavedNotificationDisplayed} />
                <InfographicsBuilderHeader
                    isUndoButtonDisabled={currentStateIndex === 0}
                    isRedoButtonDisabled={currentStateIndex === infographicsStates.length - 1}
                    undo={this.handleUndo}
                    redo={this.handleRedo}
                    saveInfographics={this.handleSaveInfographics}
                />
                <Content
                    infographicsDetails={infographicsStates[currentStateIndex]}
                    addNewInfographicsState={this.handleAddNewInfographicsState}
                    selectedSection={selectedSection}
                    updateSelectedSection={this.handleUpdateSelectedSection}
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

    private getInfographicsSectionById = (infographics: TInfographics, id: number): IInfographicsSection | null => {
        let result: IInfographicsSection | null = null

        infographics.forEach(row => {
            row.sections.forEach(section => {
                if (section.id === id) {
                    result =  section
                }
            })
        })

        return result
    }

    private handleUndo = () => {
        const {selectedSection, infographicsHistory} = this.state
        const {currentStateIndex, infographicsStates} = infographicsHistory

        if (currentStateIndex === 0) {
            return
        }

        const newStateIndex = currentStateIndex - 1
        const updatedSelectedSection = selectedSection &&
            this.getInfographicsSectionById(infographicsStates[newStateIndex].infographics, selectedSection.id)

        this.setState({
            infographicsHistory: {
                ...infographicsHistory,
                currentStateIndex: newStateIndex,
            },
            selectedSection: updatedSelectedSection,
        })
    }

    private handleRedo = () => {
        const {selectedSection, infographicsHistory} = this.state
        const {currentStateIndex, infographicsStates} = infographicsHistory

        if (currentStateIndex === infographicsStates.length - 1) {
            return
        }

        const newStateIndex = currentStateIndex + 1
        const updatedSelectedSection = selectedSection &&
            this.getInfographicsSectionById(infographicsStates[newStateIndex].infographics, selectedSection.id)

        this.setState({
            infographicsHistory: {
                ...infographicsHistory,
                currentStateIndex: newStateIndex,
            },
            selectedSection: updatedSelectedSection,
        })
    }

    private handleAddNewInfographicsState = (infographicsState: IInfographicsDetails) => {
        const {infographicsHistory} = this.state
        const {currentStateIndex, infographicsStates} = infographicsHistory

        const infographicsStatesUpdated = infographicsStates.slice(0, currentStateIndex + 1)

        this.setState({
            infographicsHistory: {
                ...infographicsHistory,
                currentStateIndex: currentStateIndex + 1,
                infographicsStates: [...infographicsStatesUpdated, infographicsState],
            }
        })
    }

    private handleUpdateSelectedSection = (section: IInfographicsSection | null) => {
        this.setState({
            selectedSection: section,
        })
    }

    private handleSaveInfographics = async () => {
        const {user} = this.props
        const {currentStateIndex, infographicsStates} = this.state.infographicsHistory
        const infographicsToSave = infographicsStates[currentStateIndex]
        let {id: idToUpdate} = infographicsToSave
        if (!idToUpdate) {
            idToUpdate = this.database.ref().child('infographics').push().key
            infographicsToSave.id = idToUpdate
        }

        const updates = {}
        updates[`/infographics/${idToUpdate}`] = infographicsToSave
        updates[`/user/${user.uid}/${idToUpdate}`] = infographicsToSave

        await this.database.ref().update(updates, () => {
            this.setState({isSavedNotificationDisplayed: true})
        })

        setTimeout(() => this.setState({
            isSavedNotificationDisplayed: false,
        }), 5000)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InfographicsBuilder)
