import React, {Component} from "react";
import Alarm from "./Alarms";


class AlarmList extends Component {
    render() {
        return (
                <div>
                    {this.props.alarms.map(a => <Alarm key={a.id} description={a.description} id={a.id} alarm_time={a.alarm_time} active={a.active} volume={a.volume}/>)}
                </div>
        );

    }
}

export default AlarmList;