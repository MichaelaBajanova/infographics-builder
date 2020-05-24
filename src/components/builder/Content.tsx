import React from 'react'
import 'styles/builder/Content.scss'
import produce from 'immer'
import ToolsMenu from 'components/tools-menu/ToolsMenu'
import Canvas from 'components/builder/Canvas'
import {ITheme} from 'types/ITheme'
import {IInfographicsRow, IInfographicsSection, TInfographics} from 'types/IInfographicsSection'
import {IInfographicsDetails} from 'types/IInfographicsDetails'
import {EChartType} from 'enums/EChartType'
import {IInfographicsContent} from 'types/IInfographicsContent'
import CreateChartModal from 'components/modals/chart-modal/CreateChartModal'
import CreateTimelineModal from 'components/modals/timeline-modal/CreateTimelineModal'
import SelectThemeModal from 'components/modals/theme-modal/SelectThemeModal'
import AddTextModal from 'components/modals/text-modal/AddTextModal'
import AddTitleModal from 'components/modals/title-modal/AddTitleModal'
import {ITimeline} from 'types/ITimeline'
import {IChart} from 'types/IChart'

interface IProps {
    infographicsDetails: IInfographicsDetails,
    addNewInfographicsState: (infographicsState: IInfographicsDetails) => void,
    selectedSection: IInfographicsSection | null,
    updateSelectedSection: (section: IInfographicsSection | null) => void,
}

interface IState {
    isBarChartModalOpen: boolean,
    isPieChartModalOpen: boolean,
    isTimelineModalOpen: boolean,
    isTitleModalOpen: boolean,
    isThemeModalOpen: boolean,
    isTextModalOpen: boolean,
    isSizeSettingOpen: boolean,
    isChartMenuOpen: boolean,
    nextId: number,
}

class Content extends React.Component<IProps, IState> {

    state: IState = {
        isBarChartModalOpen: false,
        isPieChartModalOpen: false,
        isTimelineModalOpen: false,
        isThemeModalOpen: false,
        isTextModalOpen: false,
        isTitleModalOpen: false,
        isSizeSettingOpen: false,
        isChartMenuOpen: false,
        nextId: this.props.infographicsDetails.nextSectionId,
    }

    render() {
        const {
            isBarChartModalOpen,
            isPieChartModalOpen,
            isTimelineModalOpen,
            isTitleModalOpen,
            isThemeModalOpen,
            isTextModalOpen,
            isSizeSettingOpen,
            isChartMenuOpen,
        } = this.state
        const isModalOpen = isBarChartModalOpen ||
            isPieChartModalOpen ||
            isTimelineModalOpen ||
            isTitleModalOpen ||
            isThemeModalOpen ||
            isTextModalOpen
        const {infographicsDetails, selectedSection} = this.props
        const {theme} = infographicsDetails

        let textEditorContent = ''
        if (selectedSection && selectedSection.content && selectedSection.content.textWithHtml) {
            textEditorContent = selectedSection.content.textWithHtml
        }

        let titleEditorContent = ''
        if (selectedSection && selectedSection.content && selectedSection.content.title) {
            titleEditorContent = selectedSection.content.title
        }

        let timeline: ITimeline | undefined
        if (selectedSection && selectedSection.content && selectedSection.content.timeline) {
            timeline = selectedSection.content.timeline
        }

        let chart: IChart | undefined
        if (selectedSection && selectedSection.content && selectedSection.content.chart) {
            chart = selectedSection.content.chart
        }

        return (
            <div className={'scope__Content'}>
                <div className={'content'}>
                    <ToolsMenu
                        infographicsDetails={infographicsDetails}
                        selectedSection={selectedSection}
                        addSection={this.handleAddRow}
                        divideSection={this.handleDivideSection}
                        setWidth={this.handleSetWidth}
                        setHeight={this.handleSetHeight}
                        openChartModal={this.handleOpenChartModal}
                        openTimelineModal={this.handleOpenTimelineModal}
                        openThemeModal={this.handleOpenThemeModal}
                        openTextModal={this.handleOpenTextModal}
                        openTitleModal={this.handleOpenTitleModal}
                        openSizeSettings={this.handleOpenSizeSettings}
                        openChartMenu={this.handleOpenChartMenu}
                        closeSizeSettings={this.handleCloseSizeSettings}
                        closeChartMenu={this.handleCloseChartMenu}
                        isSizeSettingOpen={isSizeSettingOpen}
                        isChartMenuOpen={isChartMenuOpen}
                        isDisabled={isModalOpen}
                    />
                    <Canvas
                        addContent={this.handleAddContentToInfographicsSection}
                        closeChartModal={this.handleCloseChartModal}
                        closeTextModal={this.handleCloseTextModal}
                        closeThemeModal={this.handleCloseThemeModal}
                        closeTimelineModal={this.handleCloseTimelineModal}
                        closeTitleModal={this.handleCloseTitleModal}
                        closeSizeSettings={this.handleCloseSizeSettings}
                        closeChartMenu={this.handleCloseChartMenu}
                        deleteSection={this.handleDeleteSection}
                        infographicsDetails={infographicsDetails}
                        isBarChartModalOpen={isBarChartModalOpen}
                        isPieChartModalOpen={isPieChartModalOpen}
                        isTextModalOpen={isTextModalOpen}
                        isThemeModalOpen={isThemeModalOpen}
                        isTimelineModalOpen={isTimelineModalOpen}
                        isTitleModalOpen={isTitleModalOpen}
                        selectedSection={selectedSection}
                        selectedTheme={theme}
                        setTheme={this.handleSetTheme}
                        updateSelectedSection={this.handleUpdateSelectedSection}
                    />
                </div>
                {isBarChartModalOpen
                    ? <CreateChartModal
                        infographicsSectionChart={(chart && chart.type === EChartType.BAR_CHART) ? chart : undefined}
                        addContent={this.handleAddContentToInfographicsSection}
                        chartType={EChartType.BAR_CHART}
                        closeChartModal={this.handleCloseChartModal}
                        selectedSection={selectedSection!}
                        theme={theme}
                    />
                    : null
                }
                {isPieChartModalOpen
                    ? <CreateChartModal
                        infographicsSectionChart={(chart && chart.type === EChartType.PIE_CHART) ? chart : undefined}
                        addContent={this.handleAddContentToInfographicsSection}
                        chartType={EChartType.PIE_CHART}
                        closeChartModal={this.handleCloseChartModal}
                        selectedSection={selectedSection!}
                        theme={theme}
                    />
                    : null
                }
                {isTimelineModalOpen
                    ? <CreateTimelineModal
                        infographicsSectionTimeline={timeline}
                        addContent={this.handleAddContentToInfographicsSection}
                        closeTimelineModal={this.handleCloseTimelineModal}
                        selectedSection={selectedSection!}
                        theme={theme}
                    />
                    : null
                }
                {isThemeModalOpen
                    ? <SelectThemeModal
                        closeThemeModal={this.handleCloseThemeModal}
                        selectedTheme={theme}
                        setTheme={this.handleSetTheme}
                    />
                    : null
                }
                {isTextModalOpen
                    ? <AddTextModal
                        addContent={this.handleAddContentToInfographicsSection}
                        closeTextModal={this.handleCloseTextModal}
                        selectedSection={selectedSection}
                        textEditorContent={textEditorContent}
                    />
                    : null
                }
                {isTitleModalOpen
                    ? <AddTitleModal
                        addContent={this.handleAddContentToInfographicsSection}
                        closeTitleModal={this.handleCloseTitleModal}
                        selectedSection={selectedSection}
                        titleEditorContent={titleEditorContent}
                    />
                    : null
                }
            </div>
        )
    }

    private handleUpdateSelectedSection = (section: IInfographicsSection | null) => {
        const {updateSelectedSection} = this.props
        const {
            isBarChartModalOpen,
            isPieChartModalOpen,
            isTimelineModalOpen,
            isTitleModalOpen,
            isThemeModalOpen,
            isTextModalOpen,
        } = this.state
        const isModalOpen = isBarChartModalOpen ||
            isPieChartModalOpen ||
            isTimelineModalOpen ||
            isTitleModalOpen ||
            isThemeModalOpen ||
            isTextModalOpen

        if (!isModalOpen) {
            updateSelectedSection(section)
        }
    }

    private handleAddRow = () => {
        const {nextId: id} = this.state
        const {infographicsDetails, addNewInfographicsState} = this.props
        const {width, infographics, nextSectionId} = infographicsDetails
        const rowHeight = 400

        const newRow: IInfographicsRow = {
            height: rowHeight,
            sections: [
                {
                    id,
                    position: {x: 0, y: infographics.length},
                    column: {start: 1, end: 2},
                    widthPercent: 100,
                    widthPx: width,
                    heightPx: rowHeight,
                    isActive: false,
                }
            ],
            columns: 1,
        }

        addNewInfographicsState({
            ...infographicsDetails,
            infographics: [...infographics, newRow],
            nextSectionId: nextSectionId + 1,
        })

        this.setState({nextId: id + 1})
    }

    private handleDeleteSection = (section: IInfographicsSection) => {
        const {
            isBarChartModalOpen,
            isPieChartModalOpen,
            isTimelineModalOpen,
            isTitleModalOpen,
            isThemeModalOpen,
            isTextModalOpen,
        } = this.state
        const isModalOpen = isBarChartModalOpen ||
            isPieChartModalOpen ||
            isTimelineModalOpen ||
            isTitleModalOpen ||
            isThemeModalOpen ||
            isTextModalOpen

        if (isModalOpen) {
            return
        }

        const {infographicsDetails, addNewInfographicsState, selectedSection, updateSelectedSection} = this.props
        const {infographics} = infographicsDetails
        const {x: column, y: row} = section.position

        let selectedSectionUpdated = selectedSection
        if (selectedSection && (selectedSection.id === section.id)) {
            selectedSectionUpdated = null
        }

        let infographicsCopy: TInfographics
        if (infographics[row].sections.length === 1) {
            // if there is only one section remaining in particular row R
            // we need to move every section in rows under R to y - 1
            infographicsCopy = produce(infographics, draft => {
                for (let i = row + 1; i < draft.length; ++i) {
                    draft[i].sections.map(section => --section.position.y)
                }
                draft.splice(row, 1) // removing whole row
            })
        } else {
            infographicsCopy = produce(infographics, draft => {
                // if section S to be deleted is the last in row then enlarge the one before S
                if (column === draft[row].sections.length - 1) {
                    draft[row].sections[column - 1].widthPercent += section.widthPercent
                    draft[row].sections[column - 1].widthPx += section.widthPx
                // otherwise enlarge the one after S
                } else {
                    draft[row].sections[column + 1].widthPercent += section.widthPercent
                    draft[row].sections[column + 1].widthPx += section.widthPx
                }
                // each section after S needs to be moved to x - 1 and have their column moved as well
                for (let i = column + 1; i < draft[row].sections.length; ++i) {
                    --draft[row].sections[i].position.x
                    --draft[row].sections[i].column.start
                    --draft[row].sections[i].column.end
                }
                draft[row].sections.splice(column, 1)
            })
        }

        addNewInfographicsState({
            ...infographicsDetails,
            infographics: infographicsCopy,
        })

        updateSelectedSection(selectedSectionUpdated)
    }

    private handleDivideSection = (section: IInfographicsSection) => {
        const {nextId: id} = this.state
        const {infographicsDetails, addNewInfographicsState, updateSelectedSection} = this.props
        const {infographics} = infographicsDetails
        const {x: column, y: row} = section.position
        const {end: colEnd} = section.column

        const newSectionWidthPercent: number = section.widthPercent / 2
        const newSectionWidthPx: number = section.widthPx / 2
        const newSectionHeightPx: number = infographics[row].height

        // update width of the divided section
        const dividedSectionUpdated = produce(section, draft => {
            draft.widthPercent = newSectionWidthPercent
            draft.widthPx = newSectionWidthPx
            if (section.content?.chart) {
                const {chart} = section.content
                const chartUpdated = {
                    ...chart,
                    width: newSectionWidthPx - 10,
                    height: newSectionHeightPx - 10,
                }
                draft.content = {
                    ...section.content,
                    chart: chartUpdated,
                }
            }
        })

        // create a new section that will be placed after the one being divided
        const newSection: IInfographicsSection = {
            id,
            position: {x: column + 1, y: row},
            column: {start: colEnd, end: colEnd + 1},
            widthPercent: newSectionWidthPercent,
            widthPx: newSectionWidthPx,
            heightPx: newSectionHeightPx,
            isActive: false,
        }

        const infographicsUpdated = produce(infographics, draft => {
            draft[row].sections[column] = dividedSectionUpdated
            // add new section S after the one that is divided
            draft[row].sections.splice(column + 1, 0, newSection)
            ++draft[row].columns
            // each section after section S needs to be moved x + 1 and also move column
            for (let i = column + 2; i < draft[row].sections.length; ++i) {
                ++draft[row].sections[i].position.x
                ++draft[row].sections[i].column.start
                ++draft[row].sections[i].column.end
            }
        })

        addNewInfographicsState({
            ...infographicsDetails,
            infographics: infographicsUpdated,
        })

        updateSelectedSection(dividedSectionUpdated)

        this.setState(produce(this.state, draftState => {
            ++draftState.nextId // needs to be increased because new section was added
        }))
    }

    private handleSetWidth = (width: number) => {
        const {infographicsDetails, addNewInfographicsState} = this.props
        const {infographics} = infographicsDetails

        // every section needs to have new width in px calculated
        const updatedInfographics = infographics.map(row => {
                const updatedSections = row.sections.map(section => {
                    return produce(section, sectionDraft => {
                        const newSectionWidth = width * (sectionDraft.widthPercent / 100)
                        sectionDraft.widthPx = newSectionWidth
                        if (section.content?.chart) {
                            const {chart} = section.content
                            const chartUpdated = {
                                ...chart,
                                width: newSectionWidth - 10,
                            }
                            sectionDraft.content = {
                                ...section.content,
                                chart: chartUpdated,
                            }
                        }
                    })
                })
                return {
                    ...row,
                    sections: updatedSections,
                }
        })

        const updatedInfographicsDetails = {
            ...infographicsDetails,
            infographics: updatedInfographics,
            width: width,
        }

        addNewInfographicsState(updatedInfographicsDetails)
    }

    private handleSetHeight = (section: IInfographicsSection, height: number) => {
        const {infographicsDetails, addNewInfographicsState} = this.props
        const {infographics} = infographicsDetails
        const {y: row} = section.position

        const infographicsCopy = produce(infographics, draft => {
            draft[row].height = height
            draft[row].sections = infographics[row].sections.map(section => {
                return produce(section, sectionDraft => {
                    sectionDraft.heightPx = height
                    if (section.content?.chart) {
                        const {chart} = section.content
                        const chartUpdated = {
                            ...chart,
                            height: height - 10,
                        }
                        sectionDraft.content = {
                            ...section.content,
                            chart: chartUpdated,
                        }
                    }
                })
            })
        })

        addNewInfographicsState({
            ...infographicsDetails,
            infographics: infographicsCopy,
        })
    }

    private handleOpenChartModal = (type: EChartType) => {
        if (type === EChartType.BAR_CHART) {
            this.setState({
                isBarChartModalOpen: true,
            })
        }
        if (type === EChartType.PIE_CHART) {
            this.setState({
                isPieChartModalOpen: true,
            })
        }
    }

    private handleCloseChartModal = (type: EChartType) => {
        if (type === EChartType.BAR_CHART) {
            this.setState({
                isBarChartModalOpen: false,
            })
        }
        if (type === EChartType.PIE_CHART) {
            this.setState({
                isPieChartModalOpen: false,
            })
        }
    }

    private handleOpenTimelineModal = () => {
        this.setState({
            isTimelineModalOpen: true,
        })
    }

    private handleCloseTimelineModal = () => {
        this.setState({
            isTimelineModalOpen: false,
        })
    }

    private handleOpenThemeModal = () => {
        this.setState({
            isThemeModalOpen: true,
        })
    }

    private handleCloseThemeModal = () => {
        this.setState({
            isThemeModalOpen: false,
        })
    }

    private handleSetTheme = (theme: ITheme) => {
        const {infographicsDetails, addNewInfographicsState} = this.props

        addNewInfographicsState({
            ...infographicsDetails,
            theme: theme,
        })
    }

    private handleOpenTextModal = () => {
        this.setState({
            isTextModalOpen: true,
        })
    }

    private handleCloseTextModal = () => {
        this.setState({
            isTextModalOpen: false,
        })
    }

    private handleOpenTitleModal = () => {
        this.setState({
            isTitleModalOpen: true,
        })
    }

    private handleCloseTitleModal = () => {
        this.setState({
            isTitleModalOpen: false,
        })
    }

    private handleOpenSizeSettings = () => {
        this.setState({
            isSizeSettingOpen: true,
        })
    }

    private handleCloseSizeSettings = () => {
        this.setState({
            isSizeSettingOpen: false,
        })
    }

    private handleOpenChartMenu = () => {
        this.setState({
            isChartMenuOpen: true,
        })
    }

    private handleCloseChartMenu = () => {
        this.setState({
            isChartMenuOpen: false,
        })
    }

    private handleAddContentToInfographicsSection = (
        section: IInfographicsSection,
        content: IInfographicsContent,
    ) => {
        const {infographicsDetails, addNewInfographicsState, updateSelectedSection} = this.props
        const {infographics} = infographicsDetails
        const {x: column, y: row} = section.position

        const sectionUpdated = {
            ...section,
            content,
        }

        const infographicsCopy = produce(infographics, draft => {
            draft[row].sections[column] = sectionUpdated
        })

        addNewInfographicsState({
            ...infographicsDetails,
            infographics: infographicsCopy,
        })

        updateSelectedSection(sectionUpdated)
    }
}

export default Content
