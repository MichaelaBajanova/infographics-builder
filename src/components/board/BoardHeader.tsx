import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import 'styles/board/BoardHeader.scss'
import User from 'components/common/User'
import * as firebase from 'firebase'
import history from '../../history'
import {signOut} from 'ducks/auth/authActions'
import {ERoute} from 'enums/ERoute'
import {EUserLocation} from 'enums/EUserLocation'

interface IDispatchProps {
    signOut: typeof signOut,
}

interface IProps extends IDispatchProps {}

interface IState {
    isDropdownOpen: boolean,
}

const mapDispatchToProps = {
    signOut,
}

class BoardHeader extends React.Component<IProps, IState> {

    state: IState = {
        isDropdownOpen: false,
    }

    render() {
        const {isDropdownOpen} = this.state

        return (
            <div className={'scope__BoardHeader'}>
                <Link to={ERoute.HOME} className={'home'}>
                    <h1>Infographics Builder</h1>
                </Link>
                <User
                    onDropdownClick={this.handleDropdownClick}
                    isDropdownOpen={isDropdownOpen}
                    location={EUserLocation.BOARD}
                />
                <div className={`dropdown ${isDropdownOpen ? 'dropdown--displayed' : ''}`}>
                    {isDropdownOpen
                        ? <ul>
                            <li onClick={this.handleSignOut}>Sign out</li>
                        </ul>
                        : null
                    }
                </div>
            </div>
        )
    }

    private handleDropdownClick = () => {
        const {isDropdownOpen} = this.state

        this.setState({
            isDropdownOpen: !isDropdownOpen,
        })
    }

    private handleSignOut = (event: any) => {
        event.preventDefault()
        const {signOut} = this.props

        firebase.auth().signOut().then(() => {
            signOut(true)
        }).catch(() => {
            history.push(ERoute.ERROR)
        })
    }
}

export default connect(null, mapDispatchToProps)(BoardHeader)
