import {calendarModes} from "../../constants";
import styles from "../CalendarNav/CalendarNav.module.scss";
import Icon from "@mdi/react";
import {mdiChevronDown} from "@mdi/js";
import React from "react";
import PropTypes from "prop-types";
import moment from "moment";


function CentralNavSign(props) {
    const {firstDate, lastDate, mode, isMenuOpen, toggleMenu} = props;

    const sign = mode === calendarModes.MONTH ?
        firstDate.clone().format('MMM') :
        `${firstDate.clone().format('MMMM')} ${firstDate.clone().format('D')}-${lastDate.clone().format('D')}`;

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