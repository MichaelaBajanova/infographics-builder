import React, {ReactNode} from 'react'
import 'styles/tools-menu/ToolsMenuBubble.scss'

interface IProps {
    children: ReactNode,
}

const ToolsMenuBubble = (props: IProps) => {
    const {children} = props

    return (
        <div className={'scope__ToolsMenuBubble'}>
            {children}
        </div>
    )
}

export default ToolsMenuBubble
