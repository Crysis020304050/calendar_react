import React, {Component} from 'react';
import moment from "moment";
import PropTypes from 'prop-types';
import {calendarModes} from "../../constants";
import PrevOrNextCalendarButton from "../PrevOrNextCalendarButton";
import styles from './CalendarNav.module.scss';
import Icon from '@mdi/react';
import {mdiChevronDown} from '@mdi/js';

const CentralNavSign = props => {
    const {firstDate, lastDate, mode, isMenuOpen, toggleContainer, toggleMenu} = props;
    const sign = mode === calendarModes.MONTH ? firstDate.clone().format('MMM') : `${firstDate.clone().format('MMMM')} ${firstDate.clone().format('D')}-${lastDate.clone().format('D')}`;
    return (
        <div className={styles.centralSign} onClick={toggleMenu} ref={toggleContainer}>
            <div className={styles.currentItem}>{sign}</div>
            <Icon size={'24px'} path={mdiChevronDown} color={'white'} rotate={isMenuOpen ? 180 : 0}/>
        </div>
    );
};

class CalendarNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMenuOpen: false,
        };
        this.toggleContainer = React.createRef();
    }

    componentDidMount() {
        window.addEventListener('click', this.onClickOutsideHandler);
    }

    componentWillUnmount() {
        window.removeEventListener('click', this.onClickOutsideHandler);
    }

    toggleMenu = () => {
        this.setState({
            isMenuOpen: !this.state.isMenuOpen,
        })
    };

    onClickOutsideHandler = e => {
        if (this.state.isMenuOpen  && !this.toggleContainer.current.contains(e.target)) {
            this.setState({ isMenuOpen: false });
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
            <div className={styles.container}>
                <nav className={styles.navContainer}>
                    <PrevOrNextCalendarButton mode={mode} firstDate={firstDate} changeFirstDateAndLastDate={changeFirstDateAndLastDate}/>
                    <CentralNavSign toggleMenu={this.toggleMenu} isMenuOpen={isMenuOpen} firstDate={firstDate} lastDate={lastDate} mode={mode} toggleContainer={this.toggleContainer}/>
                    <PrevOrNextCalendarButton isNext={true} mode={mode} firstDate={firstDate} changeFirstDateAndLastDate={changeFirstDateAndLastDate}/>
                </nav>
                {
                    isMenuOpen && (
                        <div className={styles.downMenu}>
                            <div onClick={e => this.onButtonClick(calendarModes.WEEK)}>This week</div>
                            <div onClick={e => this.onButtonClick(calendarModes.MONTH)}>This month</div>
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

CentralNavSign.propTypes = {
    firstDate: PropTypes.instanceOf(moment).isRequired,
    lastDate: PropTypes.instanceOf(moment).isRequired,
    mode: PropTypes.string.isRequired,
    isMenuOpen: PropTypes.bool.isRequired,
    toggleContainer: PropTypes.object.isRequired,
    toggleMenu: PropTypes.func.isRequired,
};

export default CalendarNav;