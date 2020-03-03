import React, {Component} from 'react';
import moment from "moment";
import PropTypes from 'prop-types';
import {calendarModes} from "../../constants";
import PrevOrNextCalendarButton from "../PrevOrNextCalendarButton";
import CentralNavSign from "../CentralNavSign";
import styles from './CalendarNav.module.scss';

class CalendarNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMenuOpen: false,
        };
        this.toggleContainer = React.createRef();
    }

    componentDidMount() {
        window.addEventListener('mousedown', this.onClickOutsideHandler);
    }

    componentWillUnmount() {
        window.removeEventListener('mousedown', this.onClickOutsideHandler);
    }

    toggleMenu = () => {
        this.setState({
            isMenuOpen: !this.state.isMenuOpen,
        })
    };

    onClickOutsideHandler = e => {
        if (this.state.isMenuOpen && !this.toggleContainer.current.contains(e.target)) {
            this.setState({isMenuOpen: false});
        }
    };

    onButtonClick = (newMode) => {
        const {changeMode, changeFirstDateAndLastDate, firstDate} = this.props;
        this.toggleMenu();
        changeMode(newMode);
        const newFirstDate = firstDate.clone().startOf(newMode);
        const newLastDay = newFirstDate.clone().endOf(newMode);
        changeFirstDateAndLastDate(newFirstDate, newLastDay);
    };

    render() {
        const {mode, firstDate, lastDate, changeFirstDateAndLastDate} = this.props;
        const {isMenuOpen} = this.state;
        return (
            <div ref={this.toggleContainer} className={styles.container}>
                <nav className={styles.navContainer}>
                    <PrevOrNextCalendarButton mode={mode} firstDate={firstDate}
                                              changeFirstDateAndLastDate={changeFirstDateAndLastDate}/>
                    <CentralNavSign toggleMenu={this.toggleMenu} isMenuOpen={isMenuOpen} firstDate={firstDate}
                                    lastDate={lastDate} mode={mode}/>
                    <PrevOrNextCalendarButton isNext={true} mode={mode} firstDate={firstDate}
                                              changeFirstDateAndLastDate={changeFirstDateAndLastDate}/>
                </nav>
                {
                    isMenuOpen && (
                        <div className={styles.downMenu}>
                            <div onClick={() => this.onButtonClick(calendarModes.WEEK)}>This week</div>
                            <div onClick={() => this.onButtonClick(calendarModes.MONTH)}>This month</div>
                        </div>
                    )
                }
            </div>
        )
    }
}

CalendarNav.propTypes = {
    mode: PropTypes.string.isRequired,
    changeMode: PropTypes.func.isRequired,
    firstDate: PropTypes.instanceOf(moment).isRequired,
    lastDate: PropTypes.instanceOf(moment).isRequired,
    changeFirstDateAndLastDate: PropTypes.func.isRequired,
};

export default CalendarNav;