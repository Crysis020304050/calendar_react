import React, {Component} from 'react';
import styles from './App.module.scss';
import {loadJson} from './utils/loadJson';
import Calendar from "./components/Calendar";
import moment from "moment";
import {calendarModes} from "./constants";

class App extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            events: null,
            error: null,
            isFetching: true,
            mode: calendarModes.MONTH,
        };
    }

    loadEvents = () => {
        const eventsMap = new Map();
        loadJson('./events.json')
            .then(datesAndEventsList => {
                datesAndEventsList.forEach(dateAndEvents => {
                    eventsMap.set(moment(dateAndEvents.date).format('YYYY-MM-DD'), dateAndEvents.events);
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

    changeMode = mode => {
        this.setState({
            mode: mode,
        });
    };

    componentDidMount() {
        this.loadEvents();
    }

    render() {
        const {isFetching} = this.state;
        return (
            <div className={styles.container}>
                {
                    !isFetching && <Calendar mode={this.state.mode} events={this.state.events} changeMode={this.changeMode}/>
                }
            </div>
        );
    }
}

export default App;
