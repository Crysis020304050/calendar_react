import {calendarModes} from "../../constants";
import styles from "../CalendarNav/CalendarNav.module.scss";
import Icon from "@mdi/react";
import {mdiChevronDown} from "@mdi/js";
import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import {calendarDatesFormats} from "../../constants";


function CentralNavSign(props) {
    const {firstDate, lastDate, mode, isMenuOpen, toggleMenu} = props;

    let sign = '';
    if (mode === calendarModes.MONTH) {
        sign = firstDate.clone().format(calendarDatesFormats.SHORT_MONTH);
    }
    else if (firstDate.month() === lastDate.month()) {
        sign = `${firstDate.clone().format(calendarDatesFormats.LONG_MONTH)} ${firstDate.clone().format(calendarDatesFormats.DAY)}-${lastDate.clone().format(calendarDatesFormats.DAY)}`;
    }
    else {
        sign = `${firstDate.clone().format(calendarDatesFormats.SHORT_MONTH)} ${firstDate.clone().format(calendarDatesFormats.DAY)}-${lastDate.clone().format(calendarDatesFormats.SHORT_MONTH)} ${lastDate.clone().format(calendarDatesFormats.DAY)}`;
    }

    return (
        <div className={styles.centralSign} onClick={toggleMenu}>
            <div className={styles.currentItem}>{sign}</div>
            <Icon size={'24px'} path={mdiChevronDown} color={'white'} rotate={isMenuOpen ? 180 : 0}/>
        </div>
    );
}

CentralNavSign.propTypes = {
    firstDate: PropTypes.instanceOf(moment).isRequired,
    lastDate: PropTypes.instanceOf(moment).isRequired,
    mode: PropTypes.string.isRequired,
    isMenuOpen: PropTypes.bool.isRequired,
    toggleMenu: PropTypes.func.isRequired,
};

export default CentralNavSign;