interface IColorUsage {
    shortName: string,
    longName: string,
}

export interface IColorUsages {
    [type: string]: IColorUsage,
}
