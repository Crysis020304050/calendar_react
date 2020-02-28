import React, {Component} from 'react';
import moment from "moment";
import Date from '../Date';


class Calendar extends Component {
  constructor (props) {
    super (props);
    const {mode, events} = this.props;
    this.state = {
      today: moment(),
      firstDate: moment().startOf(mode),
      lastDate: moment().endOf(mode),
      events: events.get(moment()),
      selectedDay: moment(),
    }
  }

  selectDay = day => {
    this.setState({
      selectedDay: day,
                  })
  };

  renderDate = date => {

  };

  render() {
    const {today, events, selectedDay} = this.state;
    return <Date date={moment()} events={events} selectDay={this.selectDay} selectedDay={selectedDay} today={today}/>;
  }
}

export default Calendar;