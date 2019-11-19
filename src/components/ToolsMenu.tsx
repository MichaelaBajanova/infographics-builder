import React from 'react'
import '../styles/ToolsMenu.scss'
import {IInfographicsDetails} from '../types/IInfographicsDetails'
import {IInfographicsSection} from '../types/IInfographicsSection'
import {EIconName} from '../enums/EIconName'
import 'react-tippy/dist/tippy.css'
import ToolsMenuItem from './ToolsMenuItem'
import {EToolsTooltips} from '../enums/EToolsTooltips'
import SizeForm from './SizeForm'
// import ChartMenu from './ChartMenu'

interface IProps {
    infographicsDetails: IInfographicsDetails,
    selectedSection: IInfographicsSection | null,
    addSection: () => void,
    divideSection: (section: IInfographicsSection) => void,
    setInfographicsWidth: (width: number) => void,
    setRowHeight: (section: IInfographicsSection, height: number) => void,
}

interface IState {
    isSizeSettingOpen: boolean,
    isChartMenuOpen: boolean,
}

class ToolsMenu extends React.Component<IProps, IState> {

    state: IState = {
        isSizeSettingOpen: false,
        isChartMenuOpen: false,
    }

    render() {
        const {selectedSection, addSection, infographicsDetails, setInfographicsWidth, setRowHeight} = this.props
        const {isSizeSettingOpen, isChartMenuOpen} = this.state

        return (
            <div className="scope__ToolsMenu">
                <div className="tools-menu">
                    <ToolsMenuItem
                        iconName={EIconName.ADD}
                        action={addSection}
                        tooltip={EToolsTooltips.ADD_SECTION}
                        className={'add-section'}
                    />
                    <ToolsMenuItem
                        iconName={EIconName.CUT}
                        action={this.handleDivideColumn}
                        tooltip={(selectedSection === null) ? EToolsTooltips.DIVIDE_SECTION_DISABLED : EToolsTooltips.DIVIDE_SECTION}
                        disabled={selectedSection === null}
                        className={'divide-section'}
                    />
                    <ToolsMenuItem
                        iconName={EIconName.SIZE}
                        action={this.handleOpenSizeSettings}
                        tooltip={EToolsTooltips.CHANGE_SIZE}
                        className={'size'}
                    />
                    {isSizeSettingOpen &&
                        <SizeForm
                            infographicsDetails={infographicsDetails}
                            selectedSection={selectedSection}
                            setWidth={setInfographicsWidth}
                            setHeight={setRowHeight}
                        />
                    }
                    <ToolsMenuItem
                        iconName={EIconName.COLOR_THEME}
                        action={addSection}
                        tooltip={EToolsTooltips.PICK_THEME}
                        className={'color-theme'}
                    />
                    {/*TODO uncomment later when charts are available*/}
                    {/*<ToolsMenuItem*/}
                    {/*    iconName={EIconName.BAR_CHART}*/}
                    {/*    action={this.handleOpenChartMenu}*/}
                    {/*    tooltip={EToolsTooltips.ADD_CHART}*/}
                    {/*    disabled={selectedSection === null}*/}
                    {/*    className={'add-chart'}*/}
                    {/*/>*/}
                    {/*{isChartMenuOpen &&*/}
                    {/*    <ChartMenu*/}
                    {/*        infographicsDetails={infographicsDetails}*/}
                    {/*        selectedSection={selectedSection}*/}
                    {/*    />*/}
                    {/*}*/}
                </div>
            </div>
        );
    }

    private handleDivideColumn = () => {
        const {selectedSection, divideSection} = this.props

        if (selectedSection !== null) {
            divideSection(selectedSection)
        }
    }

    private handleOpenSizeSettings = () => {
        const {isSizeSettingOpen} = this.state

        this.setState({
            isSizeSettingOpen: !isSizeSettingOpen
        })
    }

    private handleOpenChartMenu = () => {
        const {isChartMenuOpen} = this.state

        this.setState({
            isChartMenuOpen: !isChartMenuOpen
        })
    }
}

export default ToolsMenu;
