import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './Date.module.scss';
import Moment from 'moment';

const EventItem = props => {
  const { event: { isIn } } = props;
  return <li className={classNames(styles.event, { [styles.inEvent]: isIn })}/>;
};

class Date extends Component {

  renderEvents = (events) => {
    if (events) {
      return events.map((event, index) => {
        if (index < 2) {
          return <EventItem event={event}/>;
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
        <h5 className={classNames({[styles.currentDay]: today.isSame(date, "date")})}>

        </h5>
        <ul className={classNames(styles.eventList)}>
          {this.renderEvents(events)}
        </ul>
      </div>
    );
  }
}

export default Date;

Date.propTypes = {
  date: PropTypes.instanceOf(Moment).isRequired,
  today: PropTypes.instanceOf(Moment).isRequired,
  selectedDay: PropTypes.instanceOf(Moment).isRequired,
  selectDay: PropTypes.func.isRequired,
  events: PropTypes.array.isRequired,
};

EventItem.propTypes = {
  event: PropTypes.object,
};