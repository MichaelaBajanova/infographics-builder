import React from 'react'
import {Tooltip} from 'react-tippy'
import Icon from './ui/Icon'
import '../styles/ToolsMenuItem.scss'
import {EIconType} from '../enums/EIconName'

interface IProps {
    action: () => void,
    disabled?: boolean
    tooltip?: string,
    iconName: string,
}

const ToolsMenuItem = (props: IProps) => {
    const {iconName, action, tooltip, disabled} = props

    return (
        <div className={'scope__ToolsMenuItem'}>
            <Tooltip
                title={tooltip}
                position={'bottom'}
                arrow={true}
                duration={200}
                theme={'transparent'}
                size={'small'}
                arrowSize={'small'}
            >
                <button
                    className={'tools-menu__item'}
                    onClick={action}
                    disabled={disabled}
                >
                    <span className={'main-icon'}>
                        <Icon name={iconName} type={EIconType.SOLID}/>
                    </span>
                </button>
            </Tooltip>
        </div>
    )
}

export default ToolsMenuItem
