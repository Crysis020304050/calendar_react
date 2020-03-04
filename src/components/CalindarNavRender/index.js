import React from 'react';
import styles from "../CalendarNav/CalendarNav.module.scss";
import PrevOrNextCalendarButton from "../PrevOrNextCalendarButton";
import CentralNavSign from "../CentralNavSign";
import {calendarModes} from "../../constants";
import PropTypes from 'prop-types';
import moment from "moment";

function CalendarNavRender(props) {
    const {mode, firstDate, lastDate, changeFirstDateAndLastDate, isMenuOpen, toggleContainer, toggleMenu, onButtonClick} = props;
    return (
        <div ref={toggleContainer} className={styles.container}>
            <nav className={styles.navContainer}>
                <PrevOrNextCalendarButton mode={mode} firstDate={firstDate}
                                          changeFirstDateAndLastDate={changeFirstDateAndLastDate}/>
                <CentralNavSign toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} firstDate={firstDate}
                                lastDate={lastDate} mode={mode}/>
                <PrevOrNextCalendarButton isNext={true} mode={mode} firstDate={firstDate}
                                          changeFirstDateAndLastDate={changeFirstDateAndLastDate}/>
            </nav>
            {
                isMenuOpen && (
                    <div className={styles.downMenu}>
                        <div onClick={() => onButtonClick(calendarModes.WEEK)}>This week</div>
                        <div onClick={() => onButtonClick(calendarModes.MONTH)}>This month</div>
                    </div>
                )
            }
        </div>
    )
}

CalendarNavRender.propTypes = {
    mode: PropTypes.string.isRequired,
    firstDate: PropTypes.instanceOf(moment).isRequired,
    lastDate: PropTypes.instanceOf(moment).isRequired,
    changeFirstDateAndLastDate: PropTypes.func.isRequired,
    isMenuOpen: PropTypes.bool.isRequired,
    toggleContainer: PropTypes.object.isRequired,
    toggleMenu: PropTypes.func.isRequired,
    onButtonClick: PropTypes.func.isRequired,
};

export default CalendarNavRender;