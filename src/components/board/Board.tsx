import React from 'react'
import {connect} from 'react-redux'
import * as firebase from 'firebase'
import history from '../../history'
import 'styles/board/Board.scss'
import BoardHeader from 'components/board/BoardHeader'
import {IUser} from 'types/IUser'
import {signIn, signOut} from 'ducks/auth/authActions'
import LoadingScreen from 'components/common/LoadingScreen'
import PageNotFoundScreen from 'components/common/PageNotFoundScreen'
import {IInfographicsDetails} from 'types/IInfographicsDetails'
import InfographicsPreviewList from 'components/board/InfographicsPreviewList'
import DeleteInfographicsModal from 'components/modals/delete-infographics-modal/DeleteInfographicsModal'
import {loadAllInfographics, selectInfographics, unselectInfographics} from 'ducks/board/boardActions'
import {setInfographics} from 'ducks/builder/builderActions'
import ShareInfographicsModal from 'components/modals/share-infographics-modal/ShareInfographicsModal'
import {THEMES} from 'constants/themes'
import {ETheme} from 'enums/ETheme'
import {EShareOptions} from 'enums/EShareOptions'
import {TInfographics} from 'types/IInfographicsSection'
import {ERoute} from 'enums/ERoute'

interface IStateProps {
    infographicsList: IInfographicsDetails[] | null,
    isSignedIn: boolean | null,
    user: IUser | null,
    selectedInfographics: IInfographicsDetails | null,
}

interface IDispatchProps {
    loadAllInfographics: typeof loadAllInfographics,
    selectInfographics: typeof selectInfographics,
    setInfographics: typeof setInfographics,
    signIn: typeof signIn,
    signOut: typeof signOut,
    unselectInfographics: typeof unselectInfographics,
}

interface IProps extends IStateProps, IDispatchProps {}

interface IState {
    isDeleteInfographicsModalOpen: boolean,
    isShareInfographicsModalOpen: boolean,
}

const mapStateToProps = (state) => {
    return {
        infographicsList: state.board.infographicsList,
        isSignedIn: state.auth.isSignedIn,
        selectedInfographics: state.board.selectedInfographics,
        user: state.auth.user,
    }
}

const mapDispatchToProps = {
    loadAllInfographics,
    selectInfographics,
    setInfographics,
    signIn,
    signOut,
    unselectInfographics,
}

class Board extends React.Component<IProps, IState> {

    state: IState = {
        isDeleteInfographicsModalOpen: false,
        isShareInfographicsModalOpen: false,
    }

    database

    componentDidMount() {
        this.database = firebase.database()
        this.onAuthChange()
    }

    componentDidUpdate(prevProps) {
        const {user, loadAllInfographics} = this.props

        if (user && user !== prevProps.user) {
            loadAllInfographics(user.uid)
        }
    }

    render() {
        const {isSignedIn, infographicsList} = this.props
        const {isDeleteInfographicsModalOpen, isShareInfographicsModalOpen} = this.state

        if (isSignedIn === null) {
            return <LoadingScreen />
        }

        if (!isSignedIn) {
            return <PageNotFoundScreen />
        }

        if (infographicsList === null) {
            return <LoadingScreen />
        }

        return (
            <div className={'scope__Board'}>
                <BoardHeader/>
                <div className={'board-container'}>
                    {infographicsList.length === 0
                        ? <>
                            {this.renderEmptyBoard()}
                        </>
                        : <>
                            {this.renderBoardWithInfographics(infographicsList)}
                        </>
                    }
                </div>
                {isDeleteInfographicsModalOpen &&
                    <DeleteInfographicsModal
                        closeDeleteInfographicsModal={this.handleCloseDeleteInfographicsModal}
                    />
                }
                {isShareInfographicsModalOpen &&
                    <ShareInfographicsModal closeShareInfographicsModal={this.handleCloseShareInfographicsModal} />
                }
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

    private handleCreateNewInfographics = () => {
        const {setInfographics} = this.props
        const {uid} = this.props.user!

        const infographics: IInfographicsDetails = {
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
        }

        setInfographics(infographics)

        history.push(ERoute.BUILDER)
    }

    private handleOpenDeleteInfographicsModal = (infographics: IInfographicsDetails) => {
        const {selectInfographics} = this.props

        selectInfographics(infographics)
        this.setState({
            isDeleteInfographicsModalOpen: true,
        })
    }

    private handleCloseDeleteInfographicsModal = () => {
        const {unselectInfographics} = this.props

        unselectInfographics()
        this.setState({
            isDeleteInfographicsModalOpen: false,
        })
    }

    private handleOpenShareInfographicsModal = (infographics: IInfographicsDetails) => {
        const {selectInfographics} = this.props

        selectInfographics(infographics)
        this.setState({
            isShareInfographicsModalOpen: true,
        })
    }

    private handleCloseShareInfographicsModal = () => {
        const {unselectInfographics} = this.props

        unselectInfographics()
        this.setState({
            isShareInfographicsModalOpen: false,
        })
    }

    private renderCreateNewInfographicsButton = (className: string) => {
        return (
            <button
                className={`${className}__create-new`}
                onClick={this.handleCreateNewInfographics}
            >
                New infographics
            </button>
        )
    }

    private renderEmptyBoard = () => {
        return (
            <div className={'empty-board'}>
                <div className={'empty-board__illustration'} />
                <div className={'empty-board__description'}>You don't have any infographics. Do you want to create a new one?</div>
                {this.renderCreateNewInfographicsButton('empty-board')}
            </div>
        )
    }

    private renderBoardWithInfographics = (infographicsList: IInfographicsDetails[]) => {
        const {isDeleteInfographicsModalOpen, isShareInfographicsModalOpen} = this.state
        const isModalOpen = isDeleteInfographicsModalOpen || isShareInfographicsModalOpen

        return (
            <div className={`board ${isModalOpen ? 'board--blurred' : ''}`}>
                <div className={'board__top'}>
                    <h2 className={'board__title'}>Infographics Board</h2>
                    {this.renderCreateNewInfographicsButton('board')}
                </div>
                <InfographicsPreviewList
                    infographicsList={infographicsList}
                    openDeleteInfographicsModal={this.handleOpenDeleteInfographicsModal}
                    openShareInfographicsModal={this.handleOpenShareInfographicsModal}
                />
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board)
