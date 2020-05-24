import React from 'react'
import 'styles/common/PageNotFoundScreen.scss'
import {Link} from 'react-router-dom'
import {ERoute} from 'enums/ERoute'

const PageNotFoundScreen = () => {
    return (
        <div className={'scope__PageNotFoundScreen'}>
            <div className={'page-not-found'}>
                <div className={'illustration'} />
                Page not found
                <Link to={ERoute.HOME} className={'home'}>Home</Link>
            </div>
        </div>
    )
}

export default PageNotFoundScreen
