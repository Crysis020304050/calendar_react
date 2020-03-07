import React from "react";
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './EventsListItem.module.scss';
import moment from "moment";
import {calendarDatesFormats} from "../../constants";

function EventsListItem(props) {
    const {dayEvents: {day, events}, today, selectedDay} = props;

    const renderEvents = () => {
        return events.map((event, index) => {
            const {name, body, isIn, dateWithHours} = event;

            return (
                <div key={index}
                     className={classNames(styles.container, {[styles.isIn]: isIn && dateWithHours.isSameOrAfter(today)})}>
                    <div className={styles.eventHeader}>
                        <h5 className={styles.eventName}>{name}</h5>
                        <h5>{dateWithHours.format(calendarDatesFormats.HOURS_WITH_AM_OR_PM)}</h5>
                    </div>
                    <div className={styles.eventFooter}>{body}</div>
                </div>
            );
        })
    };

    const renderDaySign = () => {
        return selectedDay.isSame(day, "date") ?
            day.clone().format(calendarDatesFormats.LONG_DAY_WITH_DATE_AND_MONTH) :
            day.clone().format(calendarDatesFormats.SHIRT_DAY_WITH_DATE_AND_MONTH)
    };

    return (
        <li>
            <h4 className={classNames(styles.dateSign, {[styles.selectedDay]: selectedDay.isSame(day, "date")})}>
                {
                    renderDaySign()
                }
            </h4>
            {
                renderEvents()
            }
        </li>
    );
}

export default EventsListItem;

EventsListItem.propTypes = {
    dayEvents: PropTypes.object.isRequired,
    today: PropTypes.instanceOf(moment).isRequired,
    selectedDay: PropTypes.instanceOf(moment).isRequired,
};