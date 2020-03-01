import React from 'react';
import moment from "moment";
import PropTypes from 'prop-types';
import {calendarModes} from "../../constants";
import styles from './PrevOrNextCalendarButton.module.scss'

function PrevOrNextCalendarButton(props) {

    const {isNext, mode, firstDate, changeFirstDateAndLastDate} = props;
    let buttonSign;
    if (isNext) {
        buttonSign = calendarModes.MONTH === mode ? firstDate.clone().add(1, calendarModes.MONTH).format('MMM') : 'next';
    }
    else {
        buttonSign = calendarModes.MONTH === mode ? firstDate.clone().subtract(1, calendarModes.MONTH).format('MMM') : 'prev';
    }

    const onCLick = () => {
      const newFirstDate = firstDate.clone();
      if (isNext) {
          newFirstDate.add(1, mode);
      }
      else {
          newFirstDate.subtract(1, mode);
      }
      changeFirstDateAndLastDate(
          newFirstDate.startOf(mode),
          newFirstDate.clone().endOf(mode),
      );
    };

    return (
      <div className={styles.navigationButton} onClick={onCLick}>{buttonSign}</div>
    );
}

PrevOrNextCalendarButton.propTypes = {
    isNext: PropTypes.bool,
    mode: PropTypes.string.isRequired,
    firstDate: PropTypes.instanceOf(moment).isRequired,
    changeFirstDateAndLastDate: PropTypes.func.isRequired,
};

export default PrevOrNextCalendarButton;