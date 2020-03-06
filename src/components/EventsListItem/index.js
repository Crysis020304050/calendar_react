import React from "react";
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './EventsListItem.module.scss';
import moment from "moment";
import {addHoursToDayTime} from "../../utils/addHoursToDayTime";

function EventsListItem(props) {
    const {dayEvents: {day, events}, today, selectedDay} = props;

    const renderEvents = () => {
        return events.map((event, index) => {
            const {name, body, time, isIn} = event;

            return (
                <div key={index}
                     className={classNames(styles.container, {[styles.isIn]: isIn && addHoursToDayTime(day, time).isSameOrAfter(today)})}>
                    <div className={styles.eventHeader}>
                        <h5 className={styles.eventName}>{name}</h5>
                        <h5>{addHoursToDayTime(day, time).format('LT')}</h5>
                    </div>
                    <div className={styles.eventFooter}>{body}</div>
                </div>
            );
        })
    };

    const renderDaySign = () => {
        return selectedDay.isSame(day, "date") ?
            day.clone().format('dddd, DD MMMM') :
            day.clone().format('ddd, DD MMMM')
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