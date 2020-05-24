import React from 'react'
import {connect} from 'react-redux'
import 'styles/common/User.scss'
import {IUser} from 'types/IUser'
import Icon from 'components/ui/Icon'
import {EIconName, EIconType} from 'enums/EIconName'
import {EUserLocation} from 'enums/EUserLocation'

interface IStateProps {
    user: IUser,
}

interface IOwnProps {
    isDropdownOpen
    location: EUserLocation,
    onDropdownClick: (event: any) => void,
}

interface IProps extends IStateProps, IOwnProps {}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
    }
}

class User extends React.Component<IProps> {

    render() {
        const {onDropdownClick, isDropdownOpen, location} = this.props
        const {displayName, photoURL} = this.props.user

        return (
            <div className={'scope__User'}>
                <div className={`user ${location === EUserLocation.BOARD ? 'user--clickable' : ''}`} onClick={onDropdownClick}>
                    <div className={'user__name'}>{displayName}</div>
                    {photoURL
                        ? <img className={'user__photo'} src={photoURL} alt={'User'} />
                        : <div className={'user__avatar'} />
                    }
                    {location === EUserLocation.BOARD &&
                    <div className={`arrow-icon arrow-icon--${isDropdownOpen ? 'menu-displayed' : 'menu-hidden'}`}>
                        <Icon
                            name={EIconName.ANGLE_DOWN}
                            type={EIconType.SOLID}
                            color={'#fff'}
                        />
                    </div>
                    }
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps)(User)
