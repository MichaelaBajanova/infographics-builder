import React from 'react'
import {IInfographicsSection, TInfographics, IInfographicsRow} from '../types/IInfographicsSection'
import ToolsMenu from './ToolsMenu';
import Canvas from './Canvas'
import {IInfographicsDetails} from '../types/IInfographicsDetails'
import produce from 'immer'

interface IState {
    infographicsDetails: IInfographicsDetails,
    nextId: number,
    selectedSection: IInfographicsSection | null,
}

class Content extends React.Component<{}, IState> {

    state: IState = {
        infographicsDetails: {
            width: 400, // the default width of infographics could be set in "New infographics" form in the future
            infographics: [] as TInfographics,
        },
        nextId: 0,
        selectedSection: null,
    }

    render() {
        const {infographicsDetails, selectedSection} = this.state

        return (
            <div className="app-wrapper">
                <ToolsMenu
                    infographicsDetails={infographicsDetails}
                    selectedSection={selectedSection}
                    addSection={this.handleAddRow}
                    divideSection={this.handleDivideSection}
                    setInfographicsWidth={this.handleSetInfographicsWidth}
                    setRowHeight={this.handleSetRowHeight}
                />
                <Canvas
                    infographicsDetails={infographicsDetails}
                    selectedSection={selectedSection}
                    handleToggleSelectSection={this.handleToggleSelectSection}
                    handleDeleteSection={this.handleDeleteSection}
                />
            </div>
        )
    }

    private handleAddRow = () => {
        const {infographicsDetails, nextId: id} = this.state
        const {width, infographics} = infographicsDetails

        const newRow: IInfographicsRow = {
            height: 250,
            sections: [
                {
                    id,
                    position: {x: 0, y: infographics.length},
                    column: {start: 1, end: 2},
                    widthPercent: 100,
                    isActive: false,
                }
            ],
            columns: 1,
        }

        this.setState({
            infographicsDetails: {
                width: width,
                infographics: [...infographics, newRow],
            },
            nextId: id + 1,
        })
    };

    private handleToggleSelectSection = (section: IInfographicsSection) => {
        const {selectedSection} = this.state

        // if already selected section is clicked again, unselect it
        this.setState({
            selectedSection: (selectedSection && section.id === selectedSection.id) ? null : section,
        })
    };

    private handleDeleteSection = (section: IInfographicsSection) => {

        const {infographicsDetails} = this.state
        const {infographics, width} = infographicsDetails
        const {x: column, y: row} = section.position

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
                // otherwise enlarge the one after S
                } else {
                    draft[row].sections[column + 1].widthPercent += section.widthPercent
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

        this.setState(produce(this.state, draftState => {
            draftState.infographicsDetails = {
                width: width,
                infographics: infographicsCopy,
            }
        }))
    };

    private handleDivideSection = (section: IInfographicsSection) => {
        const {infographicsDetails, nextId: id} = this.state
        const {infographics, width} = infographicsDetails
        const {x: column, y: row} = section.position
        const {end: colEnd} = section.column

        const newSectionWidth: number = section.widthPercent / 2

        // update width of the divided section
        const dividedSectionUpdated = produce(section, draft => {
            draft.widthPercent = newSectionWidth
        })

        // create a new section that will be placed after the one being divided
        const newSection: IInfographicsSection = {
            id,
            position: {x: column + 1, y: row},
            column: {start: colEnd, end: colEnd + 1},
            widthPercent: newSectionWidth,
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

        this.setState(produce(this.state, draftState => {
            draftState.infographicsDetails = {
                width: width,
                infographics: infographicsUpdated,
            }
            ++draftState.nextId // needs to be increased because new section was added
            draftState.selectedSection = dividedSectionUpdated
        }))
    }

    private handleSetInfographicsWidth = (width: number) => {
        const {infographicsDetails} = this.state
        const {infographics} = infographicsDetails

        this.setState(produce(this.state, draftState => {
            draftState.infographicsDetails = {
                width: width,
                infographics,
            }
        }))
    }

    private handleSetRowHeight = (section: IInfographicsSection, height: number) => {
        const {infographicsDetails} = this.state
        const {infographics, width} = infographicsDetails
        const {y: row} = section.position

        const infographicsCopy = produce(infographics, draft => {
            draft[row].height = height
        })

        this.setState(produce(this.state, draftState => {
            draftState.infographicsDetails = {
                width: width,
                infographics: infographicsCopy,
            }
        }))
    }
}

export default Content
