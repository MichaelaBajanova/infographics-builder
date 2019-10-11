import React from 'react'
import {IInfographicsSection} from '../types/IInfographicsSection'
import Editor from './Editor';
import Canvas from './Canvas'
import {IInfographicsDetails} from '../types/IInfographicsDetails'
import {ILayoutSection} from '../types/ILayoutSection'
import produce from 'immer'

interface IState {
    infographicsDetails: IInfographicsDetails,
    lastUsedId: number,
    selectedSectionId: number | null,
    columnsCount: number,
}

/***
 * Creates new IInfographicsSection object with specified id. Should be called with last used id.
 * The new section is not active by default (this means the section is not selected).
 * @param id - should be last used id.
 */
const createNewSection = (id: number): IInfographicsSection => {
    return {
        id,
        isActive: false,
    }
}

/***
 * Creates new ILayoutSection object with specified id. Should be called with last used id.
 * The new layout section is placed at the end of infographics and creates a new "row". The section
 * takes up 100% of the row's width.
 * @param id - should be last used id.
 * @param infographicsDetails - is needed to specify y coordinate of the section and number of columns
 * that the section will take up.
 */
const createNewLayoutSection = (id: number, infographicsDetails: IInfographicsDetails): ILayoutSection => {
    return {
        id,
        x: 0,
        y: infographicsDetails.sectionLayout.length,
        start: 0,
        end: 100,
        spanColumns: infographicsDetails.columns,
        columnStart: 1,
        columnEnd: infographicsDetails.columns + 1,
    }
}

/***
 * Finds layout section in 2D array of layout sections using id.
 * This function should not return undefined, because it's always called with id of selected section.
 * @param id - id of layout section to be found
 * @param sectionLayout - 2D array describing the layout
 */
const findSectionInLayout = (id: number, sectionLayout: ILayoutSection[][]) => {
    let result
    for (let row of sectionLayout) {
        result = row.find(section => section.id === id)
        if (result) break
    }
    return result as ILayoutSection
}

class AppWrapper extends React.Component<{}, IState> {

    state = {
        infographicsDetails: {
            width: '400px', // the default width of infographics could be set in "New infographics" form in the future
            sections: [] as IInfographicsSection[],
            sectionLayout: [] as ILayoutSection[][],
            columns: 1,
        },
        lastUsedId: 0,
        selectedSectionId: null,
        columnsCount: 1,
    }

    render() {
        const {infographicsDetails, selectedSectionId} = this.state
        const infographicsSections: IInfographicsSection[] = infographicsDetails.sections

        return (
            <div className="app-wrapper">
                <Editor
                    infographicsDetails={infographicsDetails}
                    infographicsSections={infographicsSections}
                    selectedSectionId={selectedSectionId}
                    addSection={this.handleAddSection}
                    divideSection={this.handleDivideSection}
                    setSize={this.handleSetSize}
                />
                <Canvas
                    infographicsDetails={infographicsDetails}
                    infographicsSections={infographicsSections}
                    selectedSectionId={selectedSectionId}
                    handleToggleSelectSection={this.handleToggleSelectSection}
                    handleDeleteSection={this.handleDeleteSection}
                    columnsCount={this.state.columnsCount}
                />
            </div>
        )
    }

    private handleAddSection = () => {

        const {infographicsDetails, lastUsedId} = this.state
        const infographicsSections: IInfographicsSection[] = infographicsDetails.sections
        const sectionLayout: ILayoutSection[][] = infographicsDetails.sectionLayout

        const newSection: IInfographicsSection = createNewSection(lastUsedId)
        const newLayoutSection: ILayoutSection = createNewLayoutSection(lastUsedId, infographicsDetails)
        const newLayoutRow: ILayoutSection[] = [newLayoutSection]

        this.setState({
            infographicsDetails: {
                width: infographicsDetails.width,
                sections: [...infographicsSections, newSection],
                sectionLayout: [...sectionLayout, newLayoutRow],
                columns: infographicsDetails.columns,
            },
            lastUsedId: lastUsedId + 1,
        })
    };

    private handleToggleSelectSection = (selectedSectionId: number) => {
        // if already selected section is clicked again, unselect it
        if (selectedSectionId === this.state.selectedSectionId) {
            this.setState({
                selectedSectionId: null,
            })
        } else {
            this.setState({
                selectedSectionId,
            });
        }
    };

    // TODO: figure out how to delete layout section
    private handleDeleteSection = (id: number) => {

        const {infographicsDetails} = this.state;
        const infographicsSections: IInfographicsSection[] = infographicsDetails.sections
        const sectionLayout: ILayoutSection[][] = infographicsDetails.sectionLayout

        const sectionPosition: number = infographicsSections.findIndex(
            (infographicsSection) => {return infographicsSection.id === id});

        const infographicsSectionsCopy: IInfographicsSection[] = [...infographicsSections];
        infographicsSectionsCopy.splice(sectionPosition, 1);

        this.setState({
            infographicsDetails: {
                sectionLayout,
                width: infographicsDetails.width,
                sections: infographicsSectionsCopy,
                columns: infographicsDetails.columns,
            }
        });
    };

    private handleDivideSection = (id: number) => {
        const {infographicsDetails, lastUsedId} = this.state
        const {sections, sectionLayout, width, columns} = infographicsDetails
        const sectionToBeDivided = findSectionInLayout(id, sectionLayout)
        const {x: column, y: row} = sectionToBeDivided

        const newSectionWidth: number = (sectionToBeDivided.end - sectionToBeDivided.start) / 2
        let columnEnd = 1
        let countWidths = 0
        const rowWithMaxColumns = sectionLayout.find((row) => columns === row.length)
        rowWithMaxColumns!.forEach(section => {
            countWidths = countWidths + (section.end - section.start)
            if (countWidths > newSectionWidth) {
                return
            }
            ++columnEnd
        })

        const dividedSectionUpdated: ILayoutSection = produce(sectionToBeDivided!, draft => {
            draft.end = draft.start + newSectionWidth
            if (columns > sectionLayout[row].length) {
                draft.columnEnd = columnEnd
            }
            draft.spanColumns = 1

        })

        const newLayoutSection: ILayoutSection = {
            id: lastUsedId,
            x: column + 1,
            y: row,
            start: dividedSectionUpdated.end,
            end: dividedSectionUpdated.end + newSectionWidth,
            spanColumns: 1,
            columnStart: dividedSectionUpdated.columnEnd,
            columnEnd: dividedSectionUpdated.columnEnd + 1,
        }

        const newSectionLayout = produce(sectionLayout, draftSectionLayout => {
            // replace old section with new divided one
            draftSectionLayout[row][column] = dividedSectionUpdated
            // and add new section after the one being divided
            draftSectionLayout[row].splice(column + 1, 0, newLayoutSection)
            // we need to move all sections that come after divided section to coordinate x+1 and also
            // move their columns +1
            for (let i = newLayoutSection.x + 1; i < draftSectionLayout[row].length; ++i) {
                ++draftSectionLayout[row][i].x
                draftSectionLayout[row][i].columnStart = draftSectionLayout[row][i - 1].columnEnd
                draftSectionLayout[row][i].columnEnd = draftSectionLayout[row][i].columnStart + 1
            }

            //if row that is being modified will as a result have more columns than current number of columns in infographics
            // detail, then every section on coordinate x = 0 that is not in this row should take up one more column
            if (draftSectionLayout[row].length > infographicsDetails.columns) {
                // draftSectionLayout.forEach(row => {
                //     if (row[0].y !== newLayoutSection.y) {
                //         ++row[column].columnEnd
                //         for (let i = column + 1; i < row.length; ++i) {
                //             row[i].columnStart = row[i-1].columnEnd
                //             row[i].columnEnd = row[i].columnStart + 1
                //         }
                //     }
                // })
                for (let i = 0; i < draftSectionLayout.length; ++i) {
                    if (i !== row) {
                        const columnToUpdate = infographicsDetails.columns > draftSectionLayout[i].length ?
                            draftSectionLayout[i].length - 1 : column
                        ++draftSectionLayout[i][columnToUpdate].columnEnd
                        for (let j = columnToUpdate + 1; j < draftSectionLayout[i].length; ++j) {
                            draftSectionLayout[i][j].columnStart = draftSectionLayout[i][j-1].columnEnd
                            draftSectionLayout[i][j].columnEnd = draftSectionLayout[i][j].columnStart + 1
                        }
                    }
                }
            }
        })

        const increaseNumberOfCols = newSectionLayout[row].length > infographicsDetails.columns
        this.setState(produce(this.state, draftState => {
            draftState.infographicsDetails = {
                width,
                sections: [...sections, createNewSection(lastUsedId)],
                sectionLayout: newSectionLayout,
                columns: increaseNumberOfCols ? ++infographicsDetails.columns : infographicsDetails.columns,
            }
            draftState.lastUsedId = lastUsedId + 1
        }), () => console.log({...this.state.infographicsDetails}))
    }

    private handleSetSize = (width: string) => {
        const {infographicsDetails} = this.state
        const sectionLayout: ILayoutSection[][] = infographicsDetails.sectionLayout

        this.setState({
            infographicsDetails: {
                sectionLayout,
                width: `${width}px`,
                sections: infographicsDetails.sections,
                columns: infographicsDetails.columns,
            }
        })
    }
}

export default AppWrapper
