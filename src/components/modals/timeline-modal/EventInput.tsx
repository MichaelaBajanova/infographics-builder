import React from 'react'
import 'styles/modals/timeline-modal/EventInput.scss'
import Icon from 'components/ui/Icon'
import Input from 'components/ui/Input'
import {ITimelineEvent} from 'types/ITimeline'
import {EIconName, EIconType} from 'enums/EIconName'
import {getEventIndex} from 'utils/timeline-utils'

interface IProps {
    events: ITimelineEvent[],
    addEvent: (event: any, timelineEvent: ITimelineEvent) => void,
    deleteEvent: (eventIndex: number) => void,
    moveEventUp: (eventIndex: number) => void,
    moveEventDown: (eventIndex: number) => void,
}

interface IState {
    dateInputValue: string,
    textInputValue: string,
}

class EventInput extends React.Component<IProps, IState> {

    state = {
        dateInputValue: '',
        textInputValue: '',
    }

    render() {
        const {events} = this.props
        const {dateInputValue, textInputValue} = this.state
        const className = 'timeline-event'

        return (
            <div className={'scope__NodeInput'}>
                <h2>Nodes</h2>
                <ul>
                    {events.map((event, index) => {
                        const {date, text} = event
                        return (
                            <li key={index} className={`${className} ${className}-${index}`}>
                                <span
                                    className={`${className}__value ${className}-${index}__value`}
                                >
                                    {`${date}: ${text}`}
                                </span>
                                <div className={`${className}__actions`}>
                                    <span
                                        className={`${className}__move-up ${className}-${index}__move-up`}
                                        onClick={this.onMoveNodeUp}
                                    >
                                        <Icon name={EIconName.MOVE_UP} type={EIconType.SOLID}/>
                                     </span>
                                    <span
                                        className={`${className}__move-down ${className}-${index}__move-down`}
                                        onClick={this.onMoveNodeDown}
                                    >
                                        <Icon name={EIconName.MOVE_DOWN} type={EIconType.SOLID}/>
                                    </span>
                                    <span
                                        className={`${className}__delete ${className}-${index}__delete`}
                                        onClick={this.onDeleteNodeClick}
                                    >
                                        <Icon name={EIconName.CLEAR} type={EIconType.SOLID}/>
                                    </span>
                                </div>
                            </li>
                        )
                    })}
                </ul>
                <form autoComplete={'off'}>
                    <Input
                        id={'date'}
                        type={'text'}
                        onChange={this.onDateInputChange}
                        value={dateInputValue}
                        placeholder={'e.g. 1939'}
                    />
                    <Input
                        id={'text'}
                        type={'text'}
                        onChange={this.onTextInputChange}
                        value={textInputValue}
                        placeholder={'e.g. Start of World War 2'}
                    />
                    <button onClick={this.onAddNodeButtonClick}><Icon type={EIconType.SOLID} name={EIconName.ADD}/></button>
                </form>
            </div>
        )
    }

    private onDateInputChange = (event: any) => {
        if (event.target.value.length > 24) {
            return
        }

        this.setState({
            dateInputValue: event.target.value,
        })
    }

    private onTextInputChange = (event: any) => {
        if (event.target.value.length > 64) {
            return
        }

        this.setState({
            textInputValue: event.target.value,
        })
    }

    private onAddNodeButtonClick = (event: any) => {
        const {addEvent} = this.props
        const {dateInputValue, textInputValue} = this.state
        addEvent(event, {
            date: dateInputValue,
            text: textInputValue,
        })

        this.setState({
            dateInputValue: '',
            textInputValue: '',
        })
    }

    private onDeleteNodeClick = (event: any) => {
        const {deleteEvent} = this.props

        const targetClass = event.target.parentNode.parentNode.parentNode.className
        deleteEvent(getEventIndex(targetClass))
    }

    private onMoveNodeUp = (event: any) => {
        const {moveEventUp} = this.props

        const targetClass = event.target.parentNode.parentNode.parentNode.className
        moveEventUp(getEventIndex(targetClass))
    }

    private onMoveNodeDown = (event: any) => {
        const {moveEventDown} = this.props

        const targetClass = event.target.parentNode.parentNode.parentNode.className
        moveEventDown(getEventIndex(targetClass))
    }
}

export default EventInput
