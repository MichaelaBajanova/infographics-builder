import React from 'react'
import 'styles/infographics/InfographicsSection.scss'
import Icon from 'components/ui/Icon'
import Chart from 'components/infographics/Chart'
import InfographicsTimeline from 'components/infographics/InfographicsTimeline'
import {IInfographicsSection} from 'types/IInfographicsSection'
import {ITheme} from 'types/ITheme'
import {EIconName, EIconType} from 'enums/EIconName'
import {EColorUsage} from 'enums/EColorUsage'
import {EFontUsage} from 'enums/EFontUsage'

interface IProps {
    deleteSection?: (section: IInfographicsSection) => void,
    isInteractive: boolean,
    section: IInfographicsSection,
    theme: ITheme,
    updateSelectedSection?: (section: IInfographicsSection | null) => void,
}

const InfographicsSection: React.FC<IProps> = (props) => {

    const {
        deleteSection,
        isInteractive,
        section,
        theme,
        updateSelectedSection,
    } = props;
    const {column, isActive} = section
    const {fonts, colors} = theme
    const contentClassName = 'content'

    let infographicsSectionStyle
    infographicsSectionStyle = {
        gridColumn: `${column.start} / ${column.end}`,
    }

    const onInfographicsSectionClick = (event: React.MouseEvent) => {
        event.stopPropagation()

        if (isInteractive) {
            updateSelectedSection!(section)
        }
    }

    const onDeleteIconClick = (event: any) => {
        event.stopPropagation()

        if (deleteSection) {
            deleteSection(section)
        }
    }

    const InfographicsTitle = (props: {title: string}) => {
        const {title} = props
        const titleStyle = {
            color: colors[EColorUsage.PRIMARY].hex,
            fontFamily: fonts[EFontUsage.TITLE].fontName,
            fontSize: fonts[EFontUsage.TITLE].fontSize,
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
            fontSize: fonts[EFontUsage.PARAGRAPHS].fontSize,
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
                    {chart
                        ? <div className={`${contentClassName}__chart`}>
                             <Chart chart={chart} theme={theme} />
                         </div>
                        : null}
                    {timeline
                        ? <div className={`${contentClassName}__timeline`}>
                            <InfographicsTimeline theme={theme} timeline={timeline} />
                        </div>
                        : null}
                    {textWithHtml ? <InfographicsText textWithHtml={textWithHtml} /> : null}
                    {title ? <InfographicsTitle title={title} /> : null}
                </div>
            )
        } else {
            return null
        }
    }

    if (!isInteractive) {
        return (
            <div className={'scope__InfographicsSectionPreview'} style={infographicsSectionStyle}>
                <InfographicsContent/>
            </div>
        )
    }

    return (
        <div
            className={`scope__InfographicsSection ${isActive ? 'scope__InfographicsSection--active' : ''}`}
            style={infographicsSectionStyle}
        >
            <div
                className={'infographics__infographics-section'}
                onClick={onInfographicsSectionClick}
            >
                <InfographicsContent/>
                <span className="infographics__delete-infographics" onClick={onDeleteIconClick}>
                    <Icon name={EIconName.CLEAR} type={EIconType.SOLID}/>
                </span>
            </div>
        </div>
    )
}

export default InfographicsSection
