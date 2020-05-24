import React from 'react'
import 'styles/common/LoadingScreen.scss'
import Icon from 'components/ui/Icon'
import {EIconName, EIconType} from 'enums/EIconName'

const LoadingScreen = () => {
    return (
        <div className={'scope__LoadingScreen'}>
            <div className={'loader-container'}>
                <Icon name={EIconName.SPINNER} type={EIconType.SOLID} color={'#D1D3D4'} ownClassName={'loader'} />
            </div>
        </div>
    )
}

export default LoadingScreen
