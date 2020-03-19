import React from 'react'
import 'styles/infographics/InfographicsSection.scss'
import Chart from 'components/infographics/Chart'
import InfographicsTimeline from 'components/infographics/InfographicsTimeline'
import {IInfographicsSection} from 'types/IInfographicsSection'
import {ITheme} from 'types/ITheme'
import {EColorUsage} from 'enums/EColorUsage'
import {EFontUsage} from 'enums/EFontUsage'
import {INFOGRAPHICS_PREVIEW_RATIO} from 'constants/infographicsPreviewRatio'

interface IProps {
    section: IInfographicsSection,
    theme: ITheme,
}

const InfographicsSectionPreview: React.FC<IProps> = (props) => {

    const {section, theme} = props
    const {column} = section
    const {fonts, colors} = theme
    const contentClassName = 'content'

    let infographicsSectionStyle
    infographicsSectionStyle = {
        gridColumn: `${column.start} / ${column.end}`,
    }

    const InfographicsTitle = (props: {title: string}) => {
        const {title} = props
        const titleStyle = {
            color: colors[EColorUsage.PRIMARY].hex,
            fontFamily: fonts[EFontUsage.TITLE].fontName,
            fontSize: fonts[EFontUsage.TITLE].fontSize / INFOGRAPHICS_PREVIEW_RATIO,
        }

        return (
            <div
                className={`${contentClassName}__title`}
                dangerouslySetInnerHTML={{__html: title}}
                style={titleStyle}
            />
        )
    }

    const InfographicsText = (props: {textWithHtml: string}) => {
        const {textWithHtml} = props
        const textStyle = {
            color: colors[EColorUsage.TEXT].hex,
            fontFamily: fonts[EFontUsage.PARAGRAPHS].fontName,
            fontSize: fonts[EFontUsage.PARAGRAPHS].fontSize / INFOGRAPHICS_PREVIEW_RATIO,
        }

        return (
            <div
                className={`${contentClassName}__text ${contentClassName}__text--${theme.key}`}
                dangerouslySetInnerHTML={{__html: textWithHtml}}
                style={textStyle}
            />
        )
    }

    const InfographicsContent = () => {
        const {content} = props.section
        if (content) {
            const {chart, timeline, textWithHtml, title} = content

            return (
                <div className={contentClassName}>
                    {chart ? <Chart chart={chart} theme={theme} isUsedInBoardPreview={true} /> : null}
                    {timeline ? <InfographicsTimeline theme={theme} timeline={timeline} isUsedInBoardPreview={true} /> : null}
                    {textWithHtml ? <InfographicsText textWithHtml={textWithHtml} /> : null}
                    {title ? <InfographicsTitle title={title} /> : null}
                </div>
            )
        } else {
            return null
        }
    }

    return (
        <div className="scope__InfographicsSectionPreview" style={infographicsSectionStyle}>
            <InfographicsContent/>
        </div>
    )
};

export default InfographicsSectionPreview
