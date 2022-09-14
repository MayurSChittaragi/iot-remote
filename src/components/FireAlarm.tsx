import React from 'react'
import { readThingspeak } from '../api/thingspeak';
import './FireAlarm.css';

class FireAlarm extends React.Component {
    state: any = {
        alarmState: 0,
    };
    componentDidMount() {
        setInterval(() => {
            // console.log("Hello");
            readThingspeak.get('3/last.json').then((response) => {
                // console.log(response.data.field3);
                this.setState({ alarmState: parseInt(response.data.field3) });
                // console.log(this.state.alarmState);
            });
        }, 9000);
    }

    render() {
        if (this.state.alarmState !== 0) {
            return (
                <div>
                    <div>
                        <div className={`ui container segment`} style={{ backgroundColor: 'red' }}>
                            <h1>FireAlarm</h1>
                        </div>
                    </div >
                </div>
            );
        }
        return null;
    }
}

export default FireAlarm
