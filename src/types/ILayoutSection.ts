// x, y are coordinates of position in the grid
// start and end describe width of section
export interface ILayoutSection {
    id: number,
    x: number,
    y: number,
    start: number,
    end: number,
    spanColumns: number,
    columnStart: number,
    columnEnd: number,
}
