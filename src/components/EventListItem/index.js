import React from "react";
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './EventListItem.module.scss';
import moment from "moment";

function EventListItem(props) {
    const {dayEvents: {day, events}, today, selectedDay} = props;
    const renderEvents = () => {
        return events.map((event, index) => {
            const {name, body, time, isIn} = event;
            return (
                <div key={index}
                     className={classNames(styles.container, {[styles.isIn]: isIn && day.isSameOrAfter(today)})}>
                    <div className={styles.eventHeader}>
                        <h5 style={{flexGrow: 1}}>{name}</h5>
                        <h5>{time}</h5>
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

export default EventListItem;

EventListItem.propTypes = {
    dayEvents: PropTypes.object.isRequired,
    today: PropTypes.instanceOf(moment).isRequired,
    selectedDay: PropTypes.instanceOf(moment).isRequired,
};