import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './Date.module.scss';
import moment from 'moment';

const EventItem = props => {
    const {event: {isIn}, date, today} = props;
    return <li className={classNames(styles.event, {[styles.inEvent]: isIn && date.isSameOrAfter(today)})}/>;
};

function Date(props) {
    const renderEvents = (events, date, today) => {
        const dayEvents = events?.get(date.format('DD.MM.YYYY'));
        if (dayEvents) {
            return dayEvents.map((event, index) => {
                if (index < 3) {
                    return <EventItem key={index} event={event} date={date} today={today}/>;
                }
                return null;
            });
        }
        return null;
    };

    const onDateClick = (e) => {
        const {selectDay, date} = props;
        e.stopPropagation();
        selectDay(date);
    };

    const {selectedDay, events, today, date, firstDate, lastDate} = props;
    return (
        <td onClick={onDateClick} className={classNames(styles.container,
            {[styles.selected]: selectedDay.isSame(date, "date")},
            {[styles.dayNotInThisMonth]: date.isBefore(firstDate, "date") || date.isAfter(lastDate, "date")}
        )}>
            <h5 className={classNames({[styles.currentDay]: today.isSame(date, "date")})}>{date.clone().format('D')}</h5>
            <ul className={classNames(styles.eventList)}>
                {renderEvents(events, date, today)}
            </ul>
        </td>
    );
}

export default Date;

Date.propTypes = {
    firstDate: PropTypes.instanceOf(moment).isRequired,
    lastDate: PropTypes.instanceOf(moment).isRequired,
    date: PropTypes.instanceOf(moment).isRequired,
    today: PropTypes.instanceOf(moment).isRequired,
    selectedDay: PropTypes.instanceOf(moment).isRequired,
    selectDay: PropTypes.func.isRequired,
    events: PropTypes.instanceOf(Map),
};

EventItem.propTypes = {
    event: PropTypes.object.isRequired,
};