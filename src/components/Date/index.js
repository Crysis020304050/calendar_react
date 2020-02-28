import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './Date.module.scss';
import moment from 'moment';

const EventItem = props => {
  const { event: { isIn }, date, today } = props;
  return <li className={classNames(styles.event, { [styles.inEvent]: isIn && date.isSameOrAfter(today.format('MM-DD-YYYY'))})}/>;
};

class Date extends Component {

  renderEvents = (events, date, today) => {
    if (events) {
      return events.map((event, index) => {
        if (index < 3) {
          return <EventItem event={event} date={date} today={today}/>;
        }
        return null;
      });
    }
    return null;
  };

  onDateClick = (e) => {
    const {selectDay, date} = this.props;
    e.stopPropagation();
    selectDay(date);
  };

  render () {
    const { selectedDay, events, today, date } = this.props;
    return (
      <div onClick={this.onDateClick} className={classNames(styles.container,
                                 { [styles.selected]: selectedDay.isSame(date, "date") })}>
        <h5 className={classNames({[styles.currentDay]: today.isSame(date, "date")})}>{date.format('D')}</h5>
        <ul className={classNames(styles.eventList)}>
          {this.renderEvents(events, date, today)}
        </ul>
      </div>
    );
  }
}

export default Date;

Date.propTypes = {
  date: PropTypes.instanceOf(moment).isRequired,
  today: PropTypes.instanceOf(moment).isRequired,
  selectedDay: PropTypes.instanceOf(moment).isRequired,
  selectDay: PropTypes.func.isRequired,
  events: PropTypes.array.isRequired,
};

EventItem.propTypes = {
  event: PropTypes.object,
};