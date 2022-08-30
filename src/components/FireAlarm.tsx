import React from 'react'
import { readThingspeak } from '../api/thingspeak';
import './FireAlarm.css';

class FireAlarm extends React.Component {
    state: any = {
        alarmState: 0,
    };
    interval = setInterval(() => {
        // console.log("Hello");
        readThingspeak.get('').then((response) => {
            // console.log(response.data.field3);
            this.setState({ alarmState: response.data.field3 });
            // console.log(this.state.alarmState);
        });
    }, 9000);
    render() {
        return (
            <div>
                <div className={(this.state.alarmState === 0) ? 'hidden' : ''}>
                    <div className={`ui container segment`} style={{ backgroundColor: 'red' }}>
                        <h1>FireAlarm</h1>
                    </div>
                </div >
            </div>
        );
    }
}

export default FireAlarm
