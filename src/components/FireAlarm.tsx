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
        (document.getElementsByTagName("body")[0] as HTMLBodyElement).style.backgroundColor = "black";
        (document.getElementById("cur") as HTMLInputElement).style.opacity = '0';
        setTimeout(()=>{(document.getElementById("cur") as HTMLInputElement).style.opacity = '1';(document.getElementById("cur") as HTMLInputElement).src = 'light.gif';},500)
        }, 9000);
    }

    render() {
        if (this.state.alarmState !== 0) {
            (document.querySelector("body") as HTMLBodyElement).style.backgroundColor = "red";
            (document.getElementById("cur") as HTMLInputElement).style.opacity = '0';
            setTimeout(()=>{(document.getElementById("cur") as HTMLInputElement).style.opacity = '1';(document.getElementById("cur") as HTMLInputElement).src = 'fire.png';},500);
            return (
                    <div></div>
            );
        }
        return null;
    }
}

export default FireAlarm
