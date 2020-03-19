import React from 'react'
import 'styles/modals/share-infographics-modal/ShareInfographicsModal.scss'
import {connect} from 'react-redux'
import * as firebase from 'firebase'
import Modal from 'components/ui/Modal'
import {EModalSize} from 'enums/EModalSize'
import {EShareOptions} from 'enums/EShareOptions'
import {EIconName, EIconType} from 'enums/EIconName'
import Icon from 'components/ui/Icon'
import EmailInput from 'components/modals/share-infographics-modal/EmailInput'
import {IInfographicsDetails} from 'types/IInfographicsDetails'
import {ISharingOptions} from 'types/ISharingOptions'
import {IUser} from 'types/IUser'
import {loadAllInfographics, selectInfographics} from 'ducks/board/boardActions'
import produce from 'immer'

interface IStateProps {
    selectedInfographics: IInfographicsDetails,
    user: IUser,
}

interface IDispatchProps {
    loadAllInfographics: typeof loadAllInfographics,
    selectInfographics: typeof selectInfographics,
}

interface IOwnProps {
    closeShareInfographicsModal: () => void,
}

interface IProps extends IStateProps, IDispatchProps, IOwnProps {}

interface IState {
    emailList: string[],
    selectedShareOption: EShareOptions,
    isCopiedNotificationDisplayed: boolean,
}

const mapStateToProps = (state) => {
    return {
        selectedInfographics: state.board.selectedInfographics,
        user: state.auth.user,
    }
}

const mapDispatchToProps = {
    loadAllInfographics,
    selectInfographics,
}

class ShareInfographicsModal extends React.Component<IProps, IState> {

    state: IState = {
        emailList: this.props.selectedInfographics.sharingOptions.customEmails,
        selectedShareOption: this.props.selectedInfographics.sharingOptions.shareWith,
        isCopiedNotificationDisplayed: false,
    }

    LINK = `http://${window.location.host}/app/preview/${this.props.selectedInfographics.id}`
    linkInputRef = React.createRef<HTMLInputElement>()

    render() {
        const {selectedShareOption, emailList, isCopiedNotificationDisplayed} = this.state
        const {closeShareInfographicsModal} = this.props

        return (
            <div className={'scope__ShareInfographicsModal'}>
                <Modal
                    headerText={'Sharing options'}
                    onCancelButtonClick={closeShareInfographicsModal}
                    onSubmitButtonClick={this.onSaveButtonClick}
                    size={EModalSize.SMALL}
                    submitButtonText={'Save changes'}
                >
                    <>
                        <div className={'link-container'}>
                            <input className={'link-input'} value={this.LINK} ref={this.linkInputRef} />
                            <span className={'copy-button'} onClick={this.onCopyButtonClick}>
                                <Icon name={EIconName.COPY} type={EIconType.REGULAR} color={'#fff'} />
                            </span>
                            <span
                                className={`copied-notification ${isCopiedNotificationDisplayed ? 'copied-notification--visible' : ''}`}
                            >
                                Copied to clipboard!
                            </span>
                        </div>
                        <span>Select who can see this infographics:</span>
                        <form className={'share-form'}>
                            <input
                                id={'only-me'}
                                value={EShareOptions.ONLY_ME}
                                type={'radio'}
                                checked={selectedShareOption === EShareOptions.ONLY_ME}
                                onChange={this.handleShareOptionChange}
                            />
                            <label htmlFor={'only-me'}>{EShareOptions.ONLY_ME}</label>
                            <input
                                id={'public'}
                                value={EShareOptions.PUBLIC}
                                type={'radio'}
                                checked={selectedShareOption === EShareOptions.PUBLIC}
                                onChange={this.handleShareOptionChange}
                            />
                            <label htmlFor={'public'}>{EShareOptions.PUBLIC}</label>
                            <input
                                id={'custom'}
                                value={EShareOptions.CUSTOM}
                                type={'radio'}
                                checked={selectedShareOption === EShareOptions.CUSTOM}
                                onChange={this.handleShareOptionChange}
                            />
                            <label htmlFor={'custom'}>{EShareOptions.CUSTOM}</label>
                            {selectedShareOption === EShareOptions.CUSTOM &&
                                <EmailInput
                                    emailList={emailList}
                                    addEmail={this.handleAddEmail}
                                    deleteEmail={this.handleDeleteEmail}
                                />
                            }
                        </form>
                    </>
                </Modal>
            </div>
        )
    }

    private handleShareOptionChange = (event: any) => {
        this.setState({
            selectedShareOption: event.target.value,
        })
    }

    private handleAddEmail = (email: string) => {
        const {emailList} = this.state
        const updatedEmailList = [...emailList, email]

        this.setState({
            emailList: updatedEmailList,
        })
    }

    private onCopyButtonClick = () => {
        const {isCopiedNotificationDisplayed} = this.state

        this.linkInputRef.current!.select()
        document.execCommand('copy')

        if (isCopiedNotificationDisplayed) {
            return
        }

        this.setState({
            isCopiedNotificationDisplayed: true,
        })
        setTimeout(() => this.setState({
            isCopiedNotificationDisplayed: false,
        }), 2500)
    }

    private onSaveButtonClick = async () => {
        const {selectedShareOption, emailList} = this.state
        const {selectedInfographics, user, closeShareInfographicsModal, loadAllInfographics, selectInfographics} = this.props
        const {id: idToUpdate} = selectedInfographics

        const sharingOptions: ISharingOptions = {
            shareWith: selectedShareOption,
            customEmails: emailList,
        }

        const updatedInfographics = {
            ...selectedInfographics,
            sharingOptions,
        }

        const updates = {}
        updates[`/infographics/${idToUpdate}`] = updatedInfographics
        updates[`/user/${user.uid}/${idToUpdate}`] = updatedInfographics

        await firebase.database().ref().update(updates)
        selectInfographics(updatedInfographics)
        loadAllInfographics(user.uid)
        closeShareInfographicsModal()
    }

    private handleDeleteEmail = (emailIndex: number) => {
        const {emailList} = this.state

        let emailListCopy: string[] = [...emailList]
        emailListCopy = produce(emailListCopy, draft => {
            draft.splice(emailIndex, 1)
        })

        this.setState(produce(this.state, draftState => {
            draftState.emailList = emailListCopy
        }))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShareInfographicsModal)
