import React from 'react'
import 'styles/modals/timeline-modal/CreateTimelineModal.scss'
import produce from 'immer'
import Modal from 'components/ui/Modal'
import EventInput from 'components/modals/timeline-modal/EventInput'
import InfographicsTimeline from 'components/infographics/InfographicsTimeline'
import {ITimeline, ITimelineEvent} from 'types/ITimeline'
import {IInfographicsSection} from 'types/IInfographicsSection'
import {EModalSize} from 'enums/EModalSize'
import {ITheme} from 'types/ITheme'
import {IInfographicsContent} from 'types/IInfographicsContent'
import {swapArrayElements} from 'utils/general-utils'

interface IProps {
    infographicsSectionTimeline?: ITimeline,
    addContent: (section: IInfographicsSection, content: IInfographicsContent) => void,
    closeTimelineModal: () => void,
    selectedSection: IInfographicsSection,
    theme: ITheme,
}

interface IState {
    timeline: ITimeline,
}

class CreateTimelineModal extends React.Component<IProps, IState> {

    state = {
        timeline: this.props.infographicsSectionTimeline
            ? this.props.infographicsSectionTimeline
            : {events: [] as ITimelineEvent[]},
    }

    render() {
        const {closeTimelineModal, theme} = this.props
        const {timeline} = this.state
        const {events} = timeline
        const isCreateButtonDisabled = events.length === 0

        console.log(events, 'events')

        return (
            <div className={'scope__CreateTimelineModal'}>
                <Modal
                    headerText={'Create Timeline'}
                    isSubmitButtonDisabled={isCreateButtonDisabled}
                    onCancelButtonClick={closeTimelineModal}
                    onSubmitButtonClick={this.onCreateButtonClick}
                    size={EModalSize.BIG}
                    submitButtonText={'Create'}
                >
                    {
                        <>
                            <div className={'timeline-settings'}>
                                <EventInput
                                    events={events}
                                    addEvent={this.handleAddEvent}
                                    deleteEvent={this.handleDeleteEvent}
                                    moveEventUp={this.handleMoveEventUp}
                                    moveEventDown={this.handleMoveEventDown}
                                />
                            </div>
                            <div className={'timeline-preview'}>
                                <InfographicsTimeline theme={theme} timeline={timeline}/>
                            </div>
                        </>
                    }
                </Modal>
            </div>
        )
    }

    private handleAddEvent = (event: any, timelineEvent: ITimelineEvent) => {
        event.preventDefault()
        this.setState(produce(this.state, draftState => {
            draftState.timeline.events = [...draftState.timeline.events, timelineEvent]
        }))
    }

    private handleDeleteEvent = (eventIndex: number) => {
        const {events} = this.state.timeline

        let eventsCopy: ITimelineEvent[] = [...events]
        eventsCopy = produce(eventsCopy, draft => {
            draft.splice(eventIndex, 1)
        })

        this.setState(produce(this.state, draftState => {
            draftState.timeline.events = eventsCopy
        }))
    }

    private handleMoveEventUp = (eventIndex: number) => {
        if (eventIndex === 0) {
            return
        }

        const {events} = this.state.timeline
        const eventsUpdated = swapArrayElements(events, eventIndex, eventIndex - 1)

        this.setState(produce(this.state, draftState => {
            draftState.timeline.events = eventsUpdated
        }))
    }

    private handleMoveEventDown = (eventIndex: number) => {
        const {events} = this.state.timeline

        if (eventIndex === events.length - 1) {
            return
        }

        const eventsUpdated = swapArrayElements(events, eventIndex, eventIndex + 1)

        this.setState(produce(this.state, draftState => {
            draftState.timeline.events = eventsUpdated
        }))
    }

    private onCreateButtonClick = () => {
        const {addContent, selectedSection, closeTimelineModal} = this.props
        let {timeline} = this.state
        const infographicsContent: IInfographicsContent = {
            timeline,
        }

        addContent(selectedSection, infographicsContent)
        closeTimelineModal()
    }
}

export default CreateTimelineModal
