import React from 'react'
import 'styles/builder/UndoRedo.scss'
import Icon from 'components/ui/Icon'
import {EIconName, EIconType} from 'enums/EIconName'

interface IProps {
    isUndoButtonDisabled: boolean,
    isRedoButtonDisabled: boolean,
    redo: () => void,
    undo: () => void,
}

const UndoRedo = (props: IProps) => {
    const {isUndoButtonDisabled, isRedoButtonDisabled, undo, redo} = props

    return (
        <div className={'scope__UndoRedo'}>
            <button onClick={undo} disabled={isUndoButtonDisabled}>
                <Icon name={EIconName.UNDO} type={EIconType.SOLID} />
            </button>
            <button onClick={redo} disabled={isRedoButtonDisabled}>
                <Icon name={EIconName.REDO} type={EIconType.SOLID} />
            </button>
        </div>
    )
}

export default UndoRedo
