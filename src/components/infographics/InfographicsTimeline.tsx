import React from 'react'
import 'styles/infographics/InfographicsTimeline.scss'
import Timeline from 'react-dual-timeline'
import {StyleRoot} from 'radium'
import {ITimeline} from 'types/ITimeline'
import {ITheme} from 'types/ITheme'
import {EColorUsage} from 'enums/EColorUsage'
import {INFOGRAPHICS_PREVIEW_RATIO} from 'constants/infographicsPreviewRatio'

interface IProps {
    theme: ITheme,
    timeline: ITimeline,
    isUsedInBoardPreview?: boolean,
}

const InfographicsTimeline = (props: IProps) => {

    const {theme, timeline, isUsedInBoardPreview} = props
    const {events} = timeline

    const itemWidth = isUsedInBoardPreview ? 85 / INFOGRAPHICS_PREVIEW_RATIO : 85
    const circleWidth = isUsedInBoardPreview ? 15 / INFOGRAPHICS_PREVIEW_RATIO : 15
    const lineWidth = isUsedInBoardPreview ? 3 / INFOGRAPHICS_PREVIEW_RATIO : 3
    const triangleWidth = isUsedInBoardPreview ? 10 / INFOGRAPHICS_PREVIEW_RATIO : 10
    const triangleHeight = isUsedInBoardPreview ? 8 / INFOGRAPHICS_PREVIEW_RATIO : 8
    const paddingToItem = isUsedInBoardPreview ? 40 / INFOGRAPHICS_PREVIEW_RATIO : 40
    const paddingTop = isUsedInBoardPreview ? 48 : 80
    const itemPadding = isUsedInBoardPreview ? 10 / INFOGRAPHICS_PREVIEW_RATIO : 10

    return (
        <div className={'scope__InfographicsTimeline'}>
            <StyleRoot>
                <Timeline
                    animations={!isUsedInBoardPreview}
                    itemWidth={itemWidth}
                    color={'#fff'}
                    activeColor={theme ? theme.colors[EColorUsage.SECONDARY].hex : '#e5e5e5'}
                    lineColor={'#e5e5e5'}
                    circleWidth={circleWidth}
                    lineWidth={lineWidth}
                    triangleWidth={triangleWidth}
                    triangleHeight={triangleHeight}
                    paddingToItem={paddingToItem}
                    paddingTop={paddingTop}
                    itemPadding={itemPadding}
                >
                    {events.map((event, index) => {
                        const {date, text} = event
                        return (
                            <div className={`event ${isUsedInBoardPreview ? 'event--preview' : ''}`} key={index}>
                                <div className={'event-date'}>{date}</div>
                                <div className={'event-text'}>{text}</div>
                            </div>
                        )
                    })}
                </Timeline>
            </StyleRoot>
        </div>
    )
}

export default React.memo(InfographicsTimeline)
