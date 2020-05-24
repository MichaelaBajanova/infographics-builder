export interface ITimelineEvent {
    date: string,
    text: string,
}

export interface ITimeline {
    events: ITimelineEvent[]
}
