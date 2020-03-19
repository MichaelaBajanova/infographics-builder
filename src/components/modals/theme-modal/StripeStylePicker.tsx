import React from 'react'
import {EStripeStyle} from 'enums/EStripeStyle'
import {EColorUsage} from 'enums/EColorUsage'
import {EIconName, EIconType} from 'enums/EIconName'
import Icon from 'components/ui/Icon'
import {ITheme} from 'types/ITheme'

interface IProps {
    theme: ITheme,
    selectedTheme: ITheme,
    selectStripeStyle: (event: any) => void,
}

const StripeStylePicker = (props: IProps) => {

    const {colors, name} = props.theme

    if (!colors[EColorUsage.BACKGROUND].stripes) {
        return null
    }

    const {selectStripeStyle} = props
    const {stripeStyle: selectedStripeStyle, name: selectedThemeName} = props.selectedTheme
    const isThemeSelected = selectedThemeName === name
    const className = `stripe-style-picker ${!isThemeSelected ? 'stripe-style-picker--disabled' : ''}`

    return (
        <div className={className}>
            <h2>Stripe style</h2>
            <form>
                {
                    Object.values(EStripeStyle).map((style, index) => {
                        const isSelected = style === selectedStripeStyle
                        const iconProps = {
                            name: isSelected ? EIconName.DOT_CIRCLE : EIconName.CIRCLE,
                            type: isSelected ? EIconType.SOLID : EIconType.REGULAR,
                            color: '#D5D5D5',
                            onClick: isThemeSelected ? selectStripeStyle : undefined,
                        }

                        return (
                            <div key={index}>
                                <Icon {...iconProps} ownClassName={`stripe-style-${style}`} />
                                <span className={'stripe-style-name'}>{style}</span>
                            </div>
                        )
                    })
                }
            </form>
        </div>
    )
}

export default StripeStylePicker
