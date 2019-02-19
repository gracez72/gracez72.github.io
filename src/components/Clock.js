import React, { Component } from 'react';
import Clock from 'react-clock';

class AlarmClock extends Component {
    state = {
      date: new Date(),
    }
   
    componentDidMount() {
      setInterval(
        () => this.setState({ date: new Date() }),
        1000
      );
    }
   
    render() {
      return (
        <div style={{alignSelf: 'center'}}>
          <Clock
            value={this.state.date}
            style={{color: 'purple'}}
          />
        </div>
      );
    }
  }

  export default AlarmClock;