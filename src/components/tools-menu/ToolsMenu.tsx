import React from 'react'
import 'styles/tools-menu/ToolsMenu.scss'
import 'react-tippy/dist/tippy.css'
import ToolsMenuItem from 'components/tools-menu/ToolsMenuItem'
import ToolsMenuBubble from 'components/tools-menu/ToolsMenuBubble'
import InfographicsSizeSettingForm from 'components/tools-menu/InfographicsSizeSettingForm'
import ChartTypePicker from 'components/tools-menu/ChartTypePicker'
import {IInfographicsDetails} from 'types/IInfographicsDetails'
import {IInfographicsSection} from 'types/IInfographicsSection'
import {EIconName} from 'enums/EIconName'
import {EToolsTooltips} from 'enums/EToolsTooltips'
import {EChartType} from 'enums/EChartType'

interface IProps {
    infographicsDetails: IInfographicsDetails,
    selectedSection: IInfographicsSection | null,
    addSection: () => void,
    divideSection: (section: IInfographicsSection) => void,
    setWidth: (width: number) => void,
    setHeight: (section: IInfographicsSection, height: number) => void,
    openChartModal: (type: EChartType) => void,
    openTimelineModal: () => void,
    openThemeModal: () => void,
    openTextModal: () => void,
    openTitleModal: () => void,
    openSizeSettings: () => void,
    closeSizeSettings: () => void,
    openChartMenu: () => void,
    closeChartMenu: () => void,
    isSizeSettingOpen: boolean,
    isChartMenuOpen: boolean,
    isDisabled: boolean,
}

class ToolsMenu extends React.Component<IProps> {

    render() {
        const {selectedSection,
            addSection,
            infographicsDetails,
            setWidth,
            setHeight,
            openChartModal,
            openTimelineModal,
            openThemeModal,
            openTextModal,
            openTitleModal,
            openSizeSettings,
            openChartMenu,
            closeSizeSettings,
            closeChartMenu,
            isSizeSettingOpen,
            isChartMenuOpen,
            isDisabled,
        } = this.props

        return (
            <div className="scope__ToolsMenu">
                <ToolsMenuItem
                    iconName={EIconName.ADD}
                    action={addSection}
                    tooltip={EToolsTooltips.ADD_SECTION}
                    disabled={isDisabled}
                />
                <ToolsMenuItem
                    iconName={EIconName.SIZE}
                    action={isSizeSettingOpen ? closeSizeSettings : openSizeSettings}
                    tooltip={EToolsTooltips.CHANGE_SIZE}
                    disabled={isDisabled}
                />
                {isSizeSettingOpen &&
                    <ToolsMenuBubble>
                        <InfographicsSizeSettingForm
                            infographicsDetails={infographicsDetails}
                            selectedSection={selectedSection}
                            setWidth={setWidth}
                            setHeight={setHeight}
                        />
                    </ToolsMenuBubble>
                }
                <ToolsMenuItem
                    iconName={EIconName.COLOR_THEME}
                    action={openThemeModal}
                    tooltip={EToolsTooltips.PICK_THEME}
                    disabled={isDisabled}
                />
                <ToolsMenuItem
                    iconName={EIconName.CUT}
                    action={this.handleDivideColumn}
                    tooltip={(selectedSection === null) ? EToolsTooltips.DIVIDE_SECTION_DISABLED : EToolsTooltips.DIVIDE_SECTION}
                    disabled={selectedSection === null || isDisabled}
                />
                <ToolsMenuItem
                    iconName={EIconName.BAR_CHART}
                    action={isChartMenuOpen ? closeChartMenu : openChartMenu}
                    tooltip={(selectedSection === null) ? EToolsTooltips.ADD_CHART_DISABLED : EToolsTooltips.ADD_CHART}
                    disabled={selectedSection === null || isDisabled}
                />
                {isChartMenuOpen &&
                    <ToolsMenuBubble>
                        <ChartTypePicker
                            selectedSection={selectedSection}
                            openChartModal={openChartModal}
                            closeChartMenu={closeChartMenu}
                        />
                    </ToolsMenuBubble>
                }
                <ToolsMenuItem
                    iconName={EIconName.CLOCK}
                    action={openTimelineModal}
                    tooltip={(selectedSection === null) ? EToolsTooltips.ADD_TIMELINE_DISABLED : EToolsTooltips.ADD_TIMELINE}
                    disabled={selectedSection === null || isDisabled}
                />
                <ToolsMenuItem
                    iconName={EIconName.HEADING}
                    action={openTitleModal}
                    tooltip={(selectedSection === null) ? EToolsTooltips.ADD_TITLE_DISABLED : EToolsTooltips.ADD_TITLE}
                    disabled={selectedSection === null || isDisabled}
                />
                <ToolsMenuItem
                    iconName={EIconName.TEXT}
                    action={openTextModal}
                    tooltip={(selectedSection === null) ? EToolsTooltips.ADD_TEXT_DISABLED : EToolsTooltips.ADD_TEXT}
                    disabled={selectedSection === null || isDisabled}
                />
            </div>
        );
    }

    private handleDivideColumn = () => {
        const {selectedSection, divideSection} = this.props

        if (selectedSection !== null) {
            divideSection(selectedSection)
        }
    }
}

export default ToolsMenu;
