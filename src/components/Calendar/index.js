import React, {Component, Fragment} from 'react';
import moment from "moment";
import CalendarBody from "../CalendarBody";
import CalendarNav from "../CalendarNav";
import PropTypes from 'prop-types';


class Calendar extends Component {
  constructor (props) {
    super (props);
    const {mode} = this.props;
    this.state = {
      today: moment(),
      firstDate: moment().startOf(mode),
      lastDate: moment().endOf(mode),
      selectedDay: moment(),
    }
  }

  selectDay = day => {
    this.setState({
      selectedDay: day,
                  })
  };

  render() {
    const {today, selectedDay, firstDate, lastDate} = this.state;
    const {mode, events, changeMode} = this.props;
    return (
        <Fragment>
        <CalendarNav mode={mode} changeMode={changeMode} firstDate={firstDate} lastDate={lastDate}/>
        <CalendarBody events={events} selectDay={this.selectDay} selectedDay={selectedDay} today={today} firstDate={firstDate} lastDate={lastDate}/>
        </Fragment>
        );
  }

}

Calendar.propTypes = {
    events: PropTypes.instanceOf(Map),
    mode: PropTypes.string.isRequired,
    changeMode: PropTypes.func.isRequired,
};



export default Calendar;