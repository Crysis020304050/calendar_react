import React, {Component} from 'react';
import Date from '../Date';
import PropTypes from 'prop-types';
import moment from "moment";

class Week extends Component {

    weekRender = () => {
        const {week, firstDate, lastDate, today, events, selectDay, selectedDay} = this.props;
        return week.map((day, index) => {
           return <Date key={index} firstDate={firstDate} lastDate={lastDate} date={day} today={today} selectedDay={selectedDay} selectDay={selectDay} events={events}/>
        });
    };

    render() {
        return (<tr>
                {this.weekRender()}
            </tr>
        );
    }

}

Week.propTypes = {
    week: PropTypes.array.isRequired,
    firstDate: PropTypes.instanceOf(moment).isRequired,
    lastDate: PropTypes.instanceOf(moment).isRequired,
    today: PropTypes.instanceOf(moment).isRequired,
    selectedDay: PropTypes.instanceOf(moment).isRequired,
    selectDay: PropTypes.func.isRequired,
    events: PropTypes.instanceOf(Map),
};

export default Week;