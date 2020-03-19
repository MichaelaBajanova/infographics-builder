import {EColorType} from 'enums/EColorType'
import {EGradient, EGradientDirection} from 'enums/EGradient'
import {EFontUsage} from 'enums/EFontUsage'
import {EColorUsage} from 'enums/EColorUsage'
import {EStripeStyle} from 'enums/EStripeStyle'

export interface IColor {
    hex?: string,
    gradient?: IGradient,
    stripes?: IStripes,
    chartColors?: string[],
    type?: EColorType,
    usage: EColorUsage,
    typeTextColor: string,
}

export interface IGradient {
    type: EGradient,
    direction: EGradientDirection,
    colors: string[],
}

export interface IStripes {
    evenColorHex: string,
    oddColorHex: string,
}

export interface IFont {
    fontName: string,
    fontSize: number,
    type: EFontUsage,
}

export interface ITheme {
    name: string,
    key: string,
    colors: {[usage: string]: IColor},
    fonts: {[usage: string]: IFont},
    stripeStyle?: EStripeStyle,
}

export interface IThemes {
    [theme: string]: ITheme,
}
