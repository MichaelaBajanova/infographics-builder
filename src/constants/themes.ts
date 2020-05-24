import {IThemes} from '../types/ITheme'
import {EColorType} from '../enums/EColorType'
import {ETheme} from '../enums/ETheme'
import {EColorUsage} from '../enums/EColorUsage'
import {EFontUsage} from 'enums/EFontUsage'
import {EGradient, EGradientDirection} from 'enums/EGradient'
import {IColorUsages} from 'types/IColorUsages'
import {EStripeStyle} from 'enums/EStripeStyle'

export const COLOR_USAGES: IColorUsages = {
    [EColorUsage.PRIMARY]: {
        shortName: EColorUsage.PRIMARY,
        longName: 'Primary',
    },
    [EColorUsage.SECONDARY]: {
        shortName: EColorUsage.SECONDARY,
        longName: 'Secondary',
    },
    [EColorUsage.TERNARY]: {
        shortName: EColorUsage.TERNARY,
        longName: 'Ternary',
    },
    [EColorUsage.BACKGROUND]: {
        shortName: EColorUsage.BACKGROUND,
        longName: 'Background',
    },
}

export const THEMES: IThemes = {

    [ETheme.GRAY_TONES]: {
        name: ETheme.GRAY_TONES,
        key: 'GRAY_TONES',
        colors: {
            [EColorUsage.BACKGROUND]: {
                hex: '#F1F1F1',
                type: EColorType.SIMPLE,
                usage: EColorUsage.BACKGROUND,
                typeTextColor: '#000',
            },
            [EColorUsage.PRIMARY]: {
                hex: '#525252',
                usage: EColorUsage.PRIMARY,
                typeTextColor: '#fff',
            },
            [EColorUsage.SECONDARY]: {
                hex: '#B9B9B9',
                usage: EColorUsage.SECONDARY,
                typeTextColor: '#fff',
            },
            [EColorUsage.TERNARY]: {
                hex: '#9E9E9E',
                usage: EColorUsage.TERNARY,
                typeTextColor: '#fff',
            },
            [EColorUsage.CHART]: {
                chartColors: ['#525252', '#727272', '#939393', '#B6B6B6', '#DADADA'],
                usage: EColorUsage.CHART,
                typeTextColor: '#fff',
            },
            [EColorUsage.TEXT]: {
                hex: '#000',
                usage: EColorUsage.TEXT,
                typeTextColor: '#fff',
            },
        },
        fonts: {
            [EFontUsage.TITLE]: {
                fontName: 'Galada',
                fontSize: 100,
                type: EFontUsage.TITLE,
            },
            [EFontUsage.PARAGRAPHS]: {
                fontName: 'Roboto',
                fontSize: 14,
                type: EFontUsage.PARAGRAPHS,
            }
        },
    },

    [ETheme.SAND]: {
        name: ETheme.SAND,
        key: 'SAND',
        stripeStyle: EStripeStyle.STRAIGHT,
        colors: {
            [EColorUsage.BACKGROUND]: {
                stripes: {
                    oddColorHex: '#f6eeee',
                    evenColorHex: '#E8D5D5',
                },
                type: EColorType.STRIPES,
                usage: EColorUsage.BACKGROUND,
                typeTextColor: '#000',
            },
            [EColorUsage.PRIMARY]: {
                hex: '#004E71',
                usage: EColorUsage.PRIMARY,
                typeTextColor: '#fff',
            },
            [EColorUsage.SECONDARY]: {
                hex: '#5D93BA',
                usage: EColorUsage.SECONDARY,
                typeTextColor: '#fff',
            },
            [EColorUsage.TERNARY]: {
                hex: '#d3afaf',
                usage: EColorUsage.TERNARY,
                typeTextColor: '#fff',
            },
            [EColorUsage.CHART]: {
                chartColors: ['#00b894', '#00cec9', '#0984e3', '#6c5ce7', '#fdcb6e', '#e17055', '#d63031', '#e84393'],
                usage: EColorUsage.CHART,
                typeTextColor: '#fff',
            },
            [EColorUsage.TEXT]: {
                hex: '#231F20',
                usage: EColorUsage.TEXT,
                typeTextColor: '#fff',
            },
        },
        fonts: {
            [EFontUsage.TITLE]: {
                fontName: 'Abril Fatface',
                fontSize: 100,
                type: EFontUsage.TITLE,
            },
            [EFontUsage.PARAGRAPHS]: {
                fontName: 'Roboto',
                fontSize: 14,
                type: EFontUsage.PARAGRAPHS,
            }
        },
    },

    [ETheme.NIGHT_SKY]: {
        name: ETheme.NIGHT_SKY,
        key: 'NIGHT_SKY',
        colors: {
            [EColorUsage.BACKGROUND]: {
                gradient: {
                    type: EGradient.LINEAR,
                    direction: EGradientDirection.TO_BOTTOM,
                    colors: ['#141e30', '#19263f', '#1d2f4f', '#22385f', '#28416f'],
                },
                type: EColorType.GRADIENT,
                usage: EColorUsage.BACKGROUND,
                typeTextColor: '#fff',
            },
            [EColorUsage.PRIMARY]: {
                hex: '#00918e',
                usage: EColorUsage.PRIMARY,
                typeTextColor: '#fff',
            },
            [EColorUsage.SECONDARY]: {
                hex: '#4dd599',
                usage: EColorUsage.SECONDARY,
                typeTextColor: '#fff',
            },
            [EColorUsage.TERNARY]: {
                hex: '#ffdc34',
                usage: EColorUsage.TERNARY,
                typeTextColor: '#000',
            },
            [EColorUsage.CHART]: {
                chartColors: ['#ffa502', '#ff4757', '#2ed573', '#1e90ff', '#3742fa'],
                usage: EColorUsage.CHART,
                typeTextColor: '#fff',
            },
            [EColorUsage.TEXT]: {
                hex: '#fff',
                usage: EColorUsage.TEXT,
                typeTextColor: '#000',
            },
        },
        fonts: {
            [EFontUsage.TITLE]: {
                fontName: 'Bebas Neue',
                fontSize: 100,
                type: EFontUsage.TITLE,
            },
            [EFontUsage.PARAGRAPHS]: {
                fontName: 'Open Sans',
                fontSize: 14,
                type: EFontUsage.PARAGRAPHS,
            }
        },
    },

    [ETheme.HONEY]: {
        name: ETheme.HONEY,
        key: 'HONEY',
        colors: {
            [EColorUsage.BACKGROUND]: {
                hex: '#fbf5f0',
                usage: EColorUsage.BACKGROUND,
                type: EColorType.SIMPLE,
                typeTextColor: '#000',
            },
            [EColorUsage.PRIMARY]: {
                hex: '#F39629',
                usage: EColorUsage.PRIMARY,
                typeTextColor: '#fff',
            },
            [EColorUsage.SECONDARY]: {
                hex: '#FFC753',
                usage: EColorUsage.SECONDARY,
                typeTextColor: '#000',
            },
            [EColorUsage.TERNARY]: {
                hex: '#AE3F7B',
                usage: EColorUsage.TERNARY,
                typeTextColor: '#fff',
            },
            [EColorUsage.CHART]: {
                chartColors: ['#f368e0', '#ff9f43', '#ee5253', '#10ac84', '#00d2d3', '#54a0ff'],
                usage: EColorUsage.CHART,
                typeTextColor: '#fff',
            },
            [EColorUsage.TEXT]: {
                hex: '#231F20',
                usage: EColorUsage.TEXT,
                typeTextColor: '#fff',
            },
        },
        fonts: {
            [EFontUsage.TITLE]: {
                fontName: 'Petit Formal Script',
                fontSize: 100,
                type: EFontUsage.TITLE,
            },
            [EFontUsage.PARAGRAPHS]: {
                fontName: 'Open Sans',
                fontSize: 14,
                type: EFontUsage.PARAGRAPHS,
            },
        },
    },

    [ETheme.BUSINESS]: {
        name: ETheme.BUSINESS,
        key: 'BUSINESS',
        colors: {
            [EColorUsage.BACKGROUND]: {
                hex: '#fafafa',
                usage: EColorUsage.BACKGROUND,
                type: EColorType.SIMPLE,
                typeTextColor: '#000',
            },
            [EColorUsage.PRIMARY]: {
                hex: '#460000',
                usage: EColorUsage.PRIMARY,
                typeTextColor: '#fff',
            },
            [EColorUsage.SECONDARY]: {
                hex: '#2F3640',
                usage: EColorUsage.SECONDARY,
                typeTextColor: '#fff',
            },
            [EColorUsage.TERNARY]: {
                hex: '#BC0022',
                usage: EColorUsage.TERNARY,
                typeTextColor: '#fff',
            },
            [EColorUsage.CHART]: {
                chartColors: ['#d63031', '#e84393', '#e17055', '#fdcb6e', '#00b894', '#00cec9', '#0984e3', '#6c5ce7'],
                usage: EColorUsage.CHART,
                typeTextColor: '#fff',
            },
            [EColorUsage.TEXT]: {
                hex: '#000',
                usage: EColorUsage.TEXT,
                typeTextColor: '#fff',
            },
        },
        fonts: {
            [EFontUsage.TITLE]: {
                fontName: 'Lora',
                fontSize: 100,
                type: EFontUsage.TITLE,
            },
            [EFontUsage.PARAGRAPHS]: {
                fontName: 'Roboto',
                fontSize: 14,
                type: EFontUsage.PARAGRAPHS,
            },
        },
    },
}

