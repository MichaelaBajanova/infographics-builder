import React from 'react'
import {connect} from 'react-redux'
import 'styles/modals/delete-infographics-modal/DeleteInfographicsModal.scss'
import Modal from 'components/ui/Modal'
import {EModalSize} from 'enums/EModalSize'
import {IUser} from 'types/IUser'
import {deleteInfographics} from 'ducks/board/boardActions'
import {IInfographicsDetails} from 'types/IInfographicsDetails'

interface IStateProps {
    selectedInfographics: IInfographicsDetails,
    user: IUser,
}

interface IDispatchProps {
    deleteInfographics: typeof deleteInfographics,
}

interface IOwnProps {
    closeDeleteInfographicsModal: () => void,
}

interface IProps extends IStateProps, IDispatchProps, IOwnProps {}

const mapStateToProps = (state) => {
    return {
        selectedInfographics: state.board.selectedInfographics,
        user: state.auth.user,
    }
}

const mapDispatchToProps = {
    deleteInfographics,
}

class DeleteInfographicsModal extends React.Component<IProps> {

    render() {
        const {closeDeleteInfographicsModal} = this.props

        return (
            <div className={'scope__DeleteInfographicsModal'}>
                <Modal
                    headerText={'Delete infographics'}
                    onCancelButtonClick={closeDeleteInfographicsModal}
                    onSubmitButtonClick={this.onDeleteButtonClick}
                    size={EModalSize.SMALL}
                    submitButtonText={'Delete'}
                    submitButtonColor={'#E20338'}
                >
                    Are you sure you want to delete this infographics?
                </Modal>
            </div>
        )
    }

    private onDeleteButtonClick = () => {
        const {
            closeDeleteInfographicsModal,
            deleteInfographics,
            selectedInfographics,
            user
        } = this.props
        deleteInfographics(user.uid, selectedInfographics.id!)
        closeDeleteInfographicsModal()
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteInfographicsModal)
