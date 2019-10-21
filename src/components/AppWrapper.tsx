import React from 'react'
import {IInfographicsSection, TInfographics, IInfographicsRow} from '../types/IInfographicsSection'
import Editor from './Editor';
import Canvas from './Canvas'
import {IInfographicsDetails} from '../types/IInfographicsDetails'
import produce from 'immer'

interface IState {
    infographicsDetails: IInfographicsDetails,
    lastUsedId: number,
    selectedSection: IInfographicsSection | null,
    columnsCount: number,
}

class AppWrapper extends React.Component<{}, IState> {

    state: IState = {
        infographicsDetails: {
            widthPx: 400, // the default width of infographics could be set in "New infographics" form in the future
            infographics: [] as TInfographics,
        },
        lastUsedId: 0,
        selectedSection: null,
        columnsCount: 1,
    }

    render() {
        const {infographicsDetails, selectedSection} = this.state

        return (
            <div className="app-wrapper">
                <Editor
                    infographicsDetails={infographicsDetails}
                    selectedSection={selectedSection}
                    addSection={this.handleAddRow}
                    divideSection={this.handleDivideSection}
                    setWidth={this.handleSetWidth}
                    setHeight={this.handleSetHeight}
                />
                <Canvas
                    infographicsDetails={infographicsDetails}
                    selectedSection={selectedSection}
                    handleToggleSelectSection={this.handleToggleSelectSection}
                    handleDeleteSection={this.handleDeleteSection}
                    columnsCount={this.state.columnsCount}
                />
            </div>
        )
    }

    private handleAddRow = () => {
        const {infographicsDetails, lastUsedId: id} = this.state
        const {widthPx, infographics} = infographicsDetails

        const newRow: IInfographicsRow = {
            heightPx: 250,
            sections: [
                {
                    id,
                    position: {
                        x: 0,
                        y: infographics.length,
                    },
                    column: {
                        start: 1,
                        end: 2,
                    },
                    widthPercent: 100,
                    isActive: false,
                }
            ],
            columns: 1,
        }

        this.setState({
            infographicsDetails: {
                widthPx,
                infographics: [...infographics, newRow],
            },
            lastUsedId: id + 1,
        })
    };

    private handleToggleSelectSection = (section: IInfographicsSection) => {
        const {selectedSection} = this.state
        // if already selected section is clicked again, unselect it
        if (section === selectedSection) {
            this.setState({
                selectedSection: null,
            })
        } else {
            this.setState({
                selectedSection: section,
            });
        }
    };

    private handleDeleteSection = (section: IInfographicsSection) => {

        const {infographicsDetails} = this.state;
        const {infographics, widthPx} = infographicsDetails
        const {x: column, y: row} = section.position

        let infographicsCopy: TInfographics
        if (infographics[row].sections.length === 1) {
            infographicsCopy = produce(infographics, draft => {
                for (let i = row + 1; i < draft.length; ++i) {
                    draft[i].sections.forEach(section => {
                        produce(section, sectionDraft => {
                            --sectionDraft.position.y
                        })
                    })
                }
                draft.splice(row, 1)
            })
        } else {
            infographicsCopy = produce(infographics, draft => {
                if (column === draft[row].sections.length - 1) {
                    draft[row].sections[column - 1].widthPercent += section.widthPercent
                } else {
                    draft[row].sections[column + 1].widthPercent += section.widthPercent
                }
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
                widthPx,
                infographics: infographicsCopy,
            }
        }))
    };

    private handleDivideSection = (section: IInfographicsSection) => {
        const {infographicsDetails, lastUsedId: id} = this.state
        const {infographics, widthPx} = infographicsDetails
        const {x: column, y: row} = section.position
        const {end: colEnd} = section.column

        const newSectionWidth: number = section.widthPercent / 2

        const dividedSectionUpdated = produce(section, draft => {
            draft.widthPercent = newSectionWidth
        })

        const newSection: IInfographicsSection = {
            id,
            position: {
                x: column + 1,
                y: row,
            },
            column: {
                start: colEnd,
                end: colEnd + 1,
            },
            widthPercent: newSectionWidth,
            isActive: false,
        }

        const infographicsUpdated = produce(infographics, draft => {
            draft[row].sections[column] = dividedSectionUpdated
            draft[row].sections.splice(column + 1, 0, newSection)
            ++draft[row].columns
            for (let i = column + 2; i < draft[row].sections.length; ++i) {
                ++draft[row].sections[i].position.x
                ++draft[row].sections[i].column.start
                ++draft[row].sections[i].column.end
            }
        })

        this.setState(produce(this.state, draftState => {
            draftState.infographicsDetails = {
                widthPx,
                infographics: infographicsUpdated,
            }
            ++draftState.lastUsedId
            draftState.selectedSection = dividedSectionUpdated
        }))
    }

    private handleSetWidth = (widthPx: number) => {
        const {infographicsDetails} = this.state
        const {infographics} = infographicsDetails

        this.setState(produce(this.state, draftState => {
            draftState.infographicsDetails = {
                widthPx,
                infographics,
            }
        }))
    }

    private handleSetHeight = (section: IInfographicsSection, heightPx: number) => {
        const {infographicsDetails} = this.state
        const {infographics, widthPx} = infographicsDetails
        const {y: row} = section.position

        const infographicsCopy = produce(infographics, draft => {
            draft[row].heightPx = heightPx
        })

        this.setState(produce(this.state, draftState => {
            draftState.infographicsDetails = {
                widthPx,
                infographics: infographicsCopy,
            }
        }))
    }
}

export default AppWrapper
