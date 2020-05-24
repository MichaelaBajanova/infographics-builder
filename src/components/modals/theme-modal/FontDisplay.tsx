import React from 'react'
import {IFont} from 'types/ITheme'
import {EFontUsage} from 'enums/EFontUsage'

interface IProps {
    font: IFont,
}

const FontDisplay = (props: IProps) => {

    const {fontName, type} = props.font

    const style = {
        fontFamily: fontName,
        fontSize: type === EFontUsage.TITLE ? 30 : 12,
    }

    return (
        <div className={'scope__FontDisplay'}>
            <div className={'font'} style={style}>
                {fontName}
            </div>
        </div>
    )
}

export default FontDisplay
