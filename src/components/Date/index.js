import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './Date.module.css';


const EventItem = props => {
  const {event: {isIn}} = props;
  return <li className={classNames(styles.event, {[styles.inEvent]: isIn})}/>
};

class Date extends Component {

  renderEvents = (events) => {
    return events.map(event => {
      return <EventItem event={event}/>
    })
  };

  render () {
    const {isSelected, events} = this.props;
    return (
      <div className={classNames(styles.container, {[styles.selected]: isSelected})}>
        <h5>

        </h5>
        <ul className={classNames(styles.eventList)}>
          {this.renderEvents(events)}
        </ul>
      </div>
    );
  }
}

export default Date;