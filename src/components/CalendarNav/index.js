import React, {Component} from 'react';
import moment from "moment";
import PropTypes from 'prop-types';
import {calendarModes} from "../../constants";
import PrevOrNextCalendarButton from "../PrevOrNextCalendarButton";


class CalendarNav extends Component {
  constructor (props) {
    super (props);
  }

  render() {
    const {mode, firstDate, lastDate, changeFirstDateAndLastDate} = this.props;
    return <PrevOrNextCalendarButton mode={mode} firstDate={firstDate} lastDate={lastDate} changeFirstDateAndLastDate={changeFirstDateAndLastDate}/>;
  }
}

CalendarNav.propTypes = {
  mode: PropTypes.string.isRequired,
  changeMode: PropTypes.func.isRequired,
  firstDate: PropTypes.instanceOf(moment).isRequired,
  lastDate: PropTypes.instanceOf(moment).isRequired,
  changeFirstDateAndLastDate: PropTypes.func.isRequired,
};

export default CalendarNav;