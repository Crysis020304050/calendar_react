import React, {Component} from 'react';
import styles from './App.module.scss';
import {loadJson} from './utils/loadJson';
import Calendar from "./components/Calendar";
import moment from "moment";
import {calendarModes} from "./constants";
import {addHoursToDayTime} from "./utils/addHoursToDayTime";

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

    loadAndSortEvents = () => {
        const eventsMap = new Map();
        loadJson('./events.json')
            .then(datesAndEventsList => {
                datesAndEventsList.forEach(dateAndEvents => {
                    const {date, events} = dateAndEvents;
                    const formattedDate = moment(date).format('YYYY-MM-DD');
                    events.sort((a, b) => addHoursToDayTime(formattedDate, a.time)- addHoursToDayTime(formattedDate, b.time));
                    eventsMap.set(formattedDate, events);
                });
                this.setState({
                    events: eventsMap,
                });
            })
            .catch(err => {
                this.setState({
                    error: err,
                });
                console.dir(err);
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
        this.loadAndSortEvents();
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
