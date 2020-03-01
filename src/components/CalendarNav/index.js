import React, {Component} from 'react';
import moment from "moment";
import PropTypes from 'prop-types';
import {calendarModes} from "../../constants";
import PrevOrNextCalendarButton from "../PrevOrNextCalendarButton";
import styles from './CalendarNav.module.scss';


class CalendarNav extends Component {
  constructor (props) {
    super (props);
  }

  render() {
    const {mode, firstDate, lastDate, changeFirstDateAndLastDate} = this.props;
    return (
        <div className={styles.container}>
          <PrevOrNextCalendarButton mode={mode} firstDate={firstDate} changeFirstDateAndLastDate={changeFirstDateAndLastDate}/>
          <PrevOrNextCalendarButton isNext={true} mode={mode} firstDate={firstDate} changeFirstDateAndLastDate={changeFirstDateAndLastDate}/>
        </div>
    )
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