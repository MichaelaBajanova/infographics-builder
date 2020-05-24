export const swapArrayElements = (array: any[], indexA: number, indexB: number) => {
    const arrayCopy = [...array]

    const temp = arrayCopy[indexA]
    arrayCopy[indexA] = arrayCopy[indexB]
    arrayCopy[indexB] = temp

    return arrayCopy
}
