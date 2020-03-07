import React, {Component} from 'react';
import styles from './App.module.scss';
import {loadJson} from './utils/loadJson';
import Calendar from "./components/Calendar";
import moment from "moment";
import {calendarModes} from "./constants";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: null,
            error: null,
            isFetching: false,
            mode: calendarModes.MONTH,
        };
    }

    addNewFieldToEventsAndSortIt = (formattedDate, events) => {
        const addHoursToDayTime = (day, time) => moment(`${day} ${time}`);
        const eventsWithNewField = events.map(event => ({...event, dateWithHours: addHoursToDayTime(formattedDate, event.time)}));
        return eventsWithNewField.sort((a, b) => a.dateWithHours - b.dateWithHours);
    };

    loadEvents = () => {
        const eventsMap = new Map();
        this.setState({
            isFetching: true,
        });
        loadJson('./events.json')
            .then(datesAndEventsList => {
                datesAndEventsList.forEach(dateAndEvents => {
                    const {date, events} = dateAndEvents;
                    const formattedDate = moment(date).format('YYYY-MM-DD');
                    eventsMap.set(formattedDate, this.addNewFieldToEventsAndSortIt(formattedDate, events));
                });
                this.setState({
                    events: eventsMap,
                });
            })
            .catch(err => {
                this.setState({
                    error: err,
                });
            })
            .finally(() => {
                this.setState({
                    isFetching: false,
                })
            });
    };

    componentDidMount() {
        this.loadEvents();
    }

    changeMode = mode => {
        this.setState({
            mode: mode,
        });
    };

    render() {
        const {isFetching, mode, events} = this.state;
        return (
            <div className={styles.container}>
                {
                    !isFetching && <Calendar mode={mode} events={events} changeMode={this.changeMode}/>
                }
            </div>
        );
    }
}

export default App;
