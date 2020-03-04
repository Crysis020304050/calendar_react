import React from "react";
import PropTypes from 'prop-types';
import moment from "moment";
import EventListItem from "../EventListItem";

function EventList(props) {
    const renderEvents = () => {
        const {events, selectedDay, lastDate, today} = props;
        const daysEvents = [];
        const startDay = selectedDay.clone();
        do {
            const dayEvents = events?.get(startDay.clone().format('DD.MM.YYYY'));
            if (dayEvents) {
                daysEvents.push({
                    day: startDay.clone(),
                    events: [...dayEvents],
                })
            }
            startDay.add(1, 'day');
        }
        while (lastDate.isSameOrAfter(startDay, 'date'));

        return daysEvents.map((dayEvents, index) => {
            return <EventListItem key={index} dayEvents={dayEvents} today={today}/>;
        });
    };


    return (
        <ul>
            {
                renderEvents()
            }
        </ul>
    );

}

export default EventList;

EventList.propTypes = {
    events: PropTypes.instanceOf(Map),
    selectedDay: PropTypes.instanceOf(moment).isRequired,
    lastDate: PropTypes.instanceOf(moment).isRequired,
};

