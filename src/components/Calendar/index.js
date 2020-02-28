import React, {Component} from 'react';
import moment from "moment";

class Calendar extends Component {
  constructor (props) {
    super (props);
    const {mode, events} = this.props;
    this.state = {
      today: moment(),
      firstDate: moment().startOf(mode),
      lastDate: moment().endOf(mode),
      events: events.get(moment())
    }
  }

  render() {
    return null;
  }
}

export default Calendar;