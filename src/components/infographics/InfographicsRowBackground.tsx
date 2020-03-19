import React from 'react'
import 'styles/infographics/InfographicsRowBackground.scss'
import {ITheme} from 'types/ITheme'
import {EColorUsage} from 'enums/EColorUsage'

interface IProps {
    theme: ITheme,
    odd: boolean,
}

const InfographicsRowBackground = (props: IProps) => {

    const {theme, odd} = props
    const {stripes} = theme.colors[EColorUsage.BACKGROUND]

    if (stripes) {
        return (
            <div className={'scope__InfographicsRowBackground'}>
                {odd
                    ? <svg
                        id={'wave'}
                        style={{display: 'block'}}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1440 320">
                        <path
                            fill={stripes.evenColorHex}
                            fillOpacity="1"
                            d="M0,160L80,181.3C160,203,320,245,480,224C640,203,800,117,960,96C1120,75,1280,117,1360,138.7L1440,160L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z">
                        </path>
                    </svg>
                    : <svg
                        id={'wave'}
                        style={{display: 'block'}}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1440 320">
                        <path
                            fill={stripes.oddColorHex}
                            fillOpacity="1"
                            d="M0,160L80,181.3C160,203,320,245,480,224C640,203,800,117,960,96C1120,75,1280,117,1360,138.7L1440,160L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z">
                        </path>
                    </svg>
                }
            </div>
        )
    } else {
        return null
    }
}

export default InfographicsRowBackground
