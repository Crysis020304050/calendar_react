import React, {Component, Fragment} from 'react';
import moment from "moment";
import CalendarBody from "../CalendarBody";
import CalendarNav from "../CalendarNav";
import EventList from "../EventsList";
import PropTypes from 'prop-types';
import {calendarModes} from "../../constants";

class Calendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: calendarModes.MONTH,
            today: moment(),
            firstDate: moment().startOf(calendarModes.MONTH),
            lastDate: moment().endOf(calendarModes.MONTH),
            selectedDay: moment(),
        }
    }

    selectDay = day => {
        this.setState({
            selectedDay: day,
        })
    };

    changeMode = mode => {
        this.setState({
            mode: mode,
        });
    };

    changeFirstDateAndLastDate = (firstDate, lastDate) => {
        this.setState({
            firstDate: firstDate,
            lastDate: lastDate,
        });
    };

    render() {
        const {mode, today, selectedDay, firstDate, lastDate} = this.state;
        const {events} = this.props;
        return (
            <Fragment>
                <CalendarNav mode={mode} changeMode={this.changeMode} firstDate={firstDate} lastDate={lastDate}
                             changeFirstDateAndLastDate={this.changeFirstDateAndLastDate}/>
                <CalendarBody events={events} selectDay={this.selectDay} selectedDay={selectedDay} today={today}
                              firstDate={firstDate} lastDate={lastDate}/>
                <EventList today={today} events={events} selectedDay={selectedDay} lastDate={lastDate}/>
            </Fragment>
        );
    }
}

Calendar.propTypes = {
    events: PropTypes.instanceOf(Map),
};

export default Calendar;