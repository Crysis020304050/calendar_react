import React from "react";
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './EventListItem.module.scss';
import moment from "moment";

function EventListItem(props) {
    const { dayEvents: {day, events}, today } = props;
    const renderEvents = () => {
      return events.map((event, index) => {
          const {name, body, time, isIn} = event;
          return (
            <div key={index} className={classNames(styles.container, {[styles.isIn]: isIn})}>
                <div>
                    <h5>{name}</h5>
                    <h5>{time}</h5>
                </div>
                <div>{body}</div>
            </div>
          );
      })
    };
    return (
        <li>
            <h4 className={classNames(styles.dateSign, {[styles.today]: today.isSame(day, "date")})}>
                {day.clone().format( 'dddd, DD MMMM' )}
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
};