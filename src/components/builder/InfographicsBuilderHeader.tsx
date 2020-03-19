import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import 'styles/builder/InfographicsBuilderHeader.scss'
import User from 'components/common/User'
import UndoRedo from 'components/builder/UndoRedo'
import {ERoute} from 'enums/ERoute'
import {IUser} from 'types/IUser'
import {EUserLocation} from 'enums/EUserLocation'

interface IStateProps {
    isSignedIn: boolean | null,
    user: IUser | null,
}

interface IOwnProps {
    isUndoButtonDisabled: boolean,
    isRedoButtonDisabled: boolean,
    redo: () => void,
    saveInfographics: () => void,
    undo: () => void,
}

interface IProps extends IStateProps, IOwnProps {}

const mapStateToProps = (state) => {
    return {
        isSignedIn: state.auth.isSignedIn,
        user: state.auth.user,
    }
}

class InfographicsBuilderHeader extends React.Component<IProps> {

    render() {
        const {isUndoButtonDisabled, isRedoButtonDisabled, undo, redo, saveInfographics} = this.props

        return (
            <div className="scope__InfographicsBuilderHeader">
                <header className="header">
                    <Link to={ERoute.BOARD}>
                        <button className={'go-to-board'}>Go to board</button>
                    </Link>
                    <button
                        className={'save'}
                        disabled={isUndoButtonDisabled}
                        onClick={saveInfographics}
                    >
                        Save changes
                    </button>
                    <UndoRedo
                        isUndoButtonDisabled={isUndoButtonDisabled}
                        isRedoButtonDisabled={isRedoButtonDisabled}
                        undo={undo}
                        redo={redo}
                    />
                    <User location={EUserLocation.BUILDER} />
                </header>
            </div>
        )
    }
}

export default connect(mapStateToProps)(InfographicsBuilderHeader)
