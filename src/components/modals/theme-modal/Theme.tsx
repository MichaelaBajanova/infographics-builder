import React from 'react'
import 'styles/modals/theme-modal/Theme.scss'
import ColorDisplay from 'components/modals/theme-modal/ColorDisplay'
import {ITheme} from 'types/ITheme'
import FontDisplay from 'components/modals/theme-modal/FontDisplay'
import Icon from 'components/ui/Icon'
import {EIconName, EIconType} from 'enums/EIconName'
import StripeStylePicker from 'components/modals/theme-modal/StripeStylePicker'

interface IProps {
    selectedTheme: ITheme,
    theme: ITheme,
    selectTheme: (event: any) => void,
    selectStripeStyle: (event: any) => void,
}

const Theme = (props: IProps) => {

    const {selectedTheme, selectTheme, selectStripeStyle, theme} = props
    const {name, colors, fonts} = theme
    const isSelected = selectedTheme.name === name
    const iconProps = {
        name: isSelected ? EIconName.CHECK_CIRCLE : EIconName.CIRCLE,
        type: isSelected ? EIconType.SOLID : EIconType.REGULAR,
        color: isSelected ? '#00C8A1' : '#EDEDED'
    }

    return (
        <div className={'scope__Theme'}>
            <Icon {...iconProps} onClick={selectTheme} ownClassName={`theme-${name}`} />
            <h1>{name}</h1>
            <StripeStylePicker theme={theme} selectedTheme={selectedTheme} selectStripeStyle={selectStripeStyle}/>
            <ul className={'colors'}>
                {
                    Object.keys(colors).map((key, index) => {
                        return (
                            <li key={index}>
                                <ColorDisplay color={colors[key]} />
                            </li>
                        )
                    })
                }
            </ul>
            <ul className={'fonts'}>
                <div className={'fonts__text'}>Fonts:</div>
                {
                    Object.keys(fonts).map((key, index) => {
                        return (
                            <li key={index}>
                                <FontDisplay font={fonts[key]} />
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default Theme
