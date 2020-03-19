import React from 'react'
import 'styles/builder/Canvas.scss'
import Infographics from 'components/infographics/Infographics'
import {IInfographicsSection} from 'types/IInfographicsSection'
import {IInfographicsDetails} from 'types/IInfographicsDetails'
import {IChart, IChartSeries} from 'types/IChart'
import {ITheme} from 'types/ITheme'
import {EChartType} from 'enums/EChartType'
import {IInfographicsContent} from 'types/IInfographicsContent'

interface IProps {
    addContent: (section: IInfographicsSection, content: IInfographicsContent) => void,
    closeChartModal: (type: EChartType) => void,
    closeTextModal: () => void,
    closeThemeModal: () => void,
    closeTimelineModal: () => void,
    closeTitleModal: () => void,
    closeSizeSettings: () => void,
    closeChartMenu: () => void,
    deleteSection: (section: IInfographicsSection) => void,
    infographicsDetails: IInfographicsDetails,
    isBarChartModalOpen: boolean,
    isPieChartModalOpen: boolean,
    isTextModalOpen: boolean,
    isThemeModalOpen: boolean,
    isTimelineModalOpen: boolean,
    isTitleModalOpen: boolean,
    selectedSection: IInfographicsSection | null,
    selectedTheme: ITheme,
    setTheme: (theme: ITheme) => void,
    updateSelectedSection: (section: IInfographicsSection | null) => void,
}

interface IState {
    charts: IChart[],
    pieChartSlices: IChartSeries[],
}

class Canvas extends React.Component<IProps, IState> {

    state = {
        charts: [] as IChart[],
        pieChartSlices: [] as IChartSeries[],
    }

    render() {
        const {
            deleteSection,
            infographicsDetails,
            isBarChartModalOpen,
            isPieChartModalOpen,
            isTextModalOpen,
            isThemeModalOpen,
            isTimelineModalOpen,
            isTitleModalOpen,
            selectedSection,
            updateSelectedSection,
        } = this.props;

        const isModalOpen =
            isBarChartModalOpen
            || isPieChartModalOpen
            || isTimelineModalOpen
            || isThemeModalOpen
            || isTextModalOpen
            || isTitleModalOpen

        return (
            <div
                className={'scope__Canvas'}
                onClick={this.handleCanvasClick}
            >
                <div className={`canvas ${isModalOpen ? 'canvas--blurred' : ''}`}>
                    <Infographics
                        deleteSection={deleteSection}
                        infographicsDetails={infographicsDetails}
                        isInteractive={true}
                        selectedSection={selectedSection}
                        updateSelectedSection={updateSelectedSection}
                    />
                </div>
            </div>
        )
    }

    private handleCanvasClick = () => {
        const {
            selectedSection,
            isBarChartModalOpen,
            isPieChartModalOpen,
            isTimelineModalOpen,
            isTitleModalOpen,
            isThemeModalOpen,
            isTextModalOpen,
            closeSizeSettings,
            closeChartMenu,
            updateSelectedSection,
        } = this.props

        if (!isBarChartModalOpen &&
            !isPieChartModalOpen &&
            !isTimelineModalOpen &&
            !isTitleModalOpen &&
            !isThemeModalOpen &&
            !isTextModalOpen &&
            selectedSection !== null
        ) {
            updateSelectedSection(null)
        }

        closeSizeSettings()
        closeChartMenu()
    }
}

export default Canvas
