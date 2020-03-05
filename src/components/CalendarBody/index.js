import React from 'react';
import Week from '../Week';
import styles from './CalendarBody.module.scss';
import moment from 'moment';
import PropTypes from 'prop-types';

const CalendarHeader = props => {
    return (<thead className={styles.tableHeader}>
    <tr>
        <th>S</th>
        <th>M</th>
        <th>T</th>
        <th>W</th>
        <th>T</th>
        <th>F</th>
        <th>S</th>
    </tr>
    </thead>);
};

function CalendarBody(props) {
    const renderBody = () => {
        const {firstDate, lastDate, today, events, selectDay, selectedDay} = props;
        const weeks = [];
        const startDay = firstDate.clone().day(-1);
        while (lastDate.isAfter(startDay, 'date')) {
            weeks.push(
                Array(7).fill(0).map(() => startDay.add(1, 'day').clone())
            )
        }
        return weeks.map((week, index) => {
            return <Week key={index} firstDate={firstDate} lastDate={lastDate} selectDay={selectDay}
                         selectedDay={selectedDay} today={today} week={week} events={events}/>
        });
    };

    return (
        <table>
            <CalendarHeader/>
            <tbody>
            {
                renderBody()
            }
            </tbody>
        </table>
    );
}

CalendarBody.propTypes = {
    firstDate: PropTypes.instanceOf(moment).isRequired,
    lastDate: PropTypes.instanceOf(moment).isRequired,
    today: PropTypes.instanceOf(moment).isRequired,
    selectedDay: PropTypes.instanceOf(moment).isRequired,
    selectDay: PropTypes.func.isRequired,
    events: PropTypes.instanceOf(Map),
};

export default CalendarBody;