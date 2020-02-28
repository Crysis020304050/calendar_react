import React, {Component} from 'react';
import styles from './App.module.scss';
import {loadJson} from './utils/loadJson';
import {calendarModes} from "./constants";
import Calendar from "./components/Calendar";
import CalendarNav from "./components/CalendarNav";


class App extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            events: null,
            error: null,
            mode: calendarModes.MONTH
        };
    }

    loadEvents = () => {
        const eventsMap = new Map();
        loadJson('./events.json')
            .then(datesAndEventsList => {
                datesAndEventsList.forEach(dateAndEvents => {
                    eventsMap.set(dateAndEvents.date, dateAndEvents.events);
                });
                this.setState({
                    events: eventsMap
                });
            })
            .catch(err => {
                this.setState({
                    error: err,
                });
            });
    };

    changeMode = mode => {
        this.setState({
            mode: mode,
        })
    };

    componentDidMount() {
        this.loadEvents();
    }

    render() {
        return (
            <div className={styles.container}>
                <CalendarNav mode={this.state.mode} changeMode={this.changeMode}/>
                <Calendar mode={this.state.mode} events={this.state.events}/>
            </div>
        );
    }
}

export default App;
