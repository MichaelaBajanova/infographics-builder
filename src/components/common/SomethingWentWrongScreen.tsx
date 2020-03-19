import React from 'react'
import 'styles/common/SomethingWentWrongScreen.scss'
import {Link} from 'react-router-dom'
import {ERoute} from 'enums/ERoute'

const SomethingWentWrongScreen = () => {
    return (
        <div className={'scope__SomethingWentWrongScreen'}>
            <div className={'something-went-wrong'}>
                <div className={'illustration'} />
                Oops! Something went wrong. :(
                <Link to={ERoute.HOME} className={'home'}>Home</Link>
            </div>
        </div>
    )
}

export default SomethingWentWrongScreen
