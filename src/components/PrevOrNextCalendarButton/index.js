import React from 'react';
import moment from "moment";
import PropTypes from 'prop-types';

function PrevOrNextCalendarButton(props) {

    return null;
}

PrevOrNextCalendarButton.propTypes = {
    mode: PropTypes.string.isRequired,
    firstDate: PropTypes.instanceOf(moment).isRequired,
    lastDate: PropTypes.instanceOf(moment).isRequired,
    changeFirstDateAndLastDate: PropTypes.func.isRequired,
};

export default PrevOrNextCalendarButton;