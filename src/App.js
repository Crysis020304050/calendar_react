import React, { Component } from 'react';
import './App.css';
import { loadJson } from './utils/loadJson';

class App extends Component {

  constructor (props, context) {
    super(props, context);
    this.state = {
      events: new Map(),
      error: null,
    };
  }

  loadEvents = () => {

    const eventsMap = new Map();

    loadJson('./events.json')
      .then(datesAndEventsList => {
        datesAndEventsList.forEach(dateAndEvents => {
          eventsMap.set(dateAndEvents.date, dateAndEvents.events);
        });
        this.setState({
                        events: eventsMap
                      });
      })
      .catch(err => {
        this.setState({
                        error: err,
                      });
      });
  };

  componentDidMount () {
    this.loadEvents();
  }

  render () {
    return null;
  }
}

export default App;
