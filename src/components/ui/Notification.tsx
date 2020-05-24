import React from 'react'
import 'styles/ui/Notification.scss'

interface IProps {
    content: string,
    isVisible: boolean,
}

const Notification = (props: IProps) => {
    const {content, isVisible} = props

    return (
        <div className={`scope__Notification ${isVisible ? 'scope__Notification--visible' : ''}`}>
            {content}
        </div>
    )
}

export default Notification
