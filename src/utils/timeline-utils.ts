export const getEventIndex = (targetClass: string) => {
    const indexPositionStart = targetClass.lastIndexOf('-') + 1
    const indexPositionEnd = targetClass.length

    return Number(targetClass.slice(indexPositionStart, indexPositionEnd))
}
