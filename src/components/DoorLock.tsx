import React, { Component } from 'react'
import { readThingspeak, writeThingspeak } from '../api/thingspeak';



export default class DoorLock extends Component {
    state: any = {
        doorState: "0",
        pin: "",
    };

    PinEntry = () => {
        if (this.state.doorState === "0") {     //LOCKED
            return (
                <form onSubmit={this.unlock}>
                    <label htmlFor="doorLock" className='label'>Door Lock</label>
                    <div className='ui input'>
                        <input type="password" id="doorLock" autoComplete="off" name="doorLock" />
                        <button type='submit' className='ui button primary'>UnLock</button>
                    </div>
                </form>
            )
        }
        else if (this.state.doorState === "1") {
            //it is unlocked, we have to lock it.
            return (
                <div>
                    <button className='ui button primary' onClick={this.lock}>Lock</button>
                </div>
            );
        }
    }

    componentDidMount() {
        readThingspeak.get('4/last.json').then(async (response) => {
            await this.setState({ pin: response.data.field4 });
        });
        readThingspeak.get('2/last.json').then(async (response) => {
            await this.setState({ doorState: response.data.field2 });
        });
    }

    private lock = () => {
        writeThingspeak.get(`?field2=0`).then(
            (response) => {
                console.log(response.data);
                this.setState({ doorState: "0" },
                    () => {
                        alert("Door is locked");
                    }
                );
            }
        ).catch(
            (error) => {
                console.log(error);
            }
        );
    }

    private unlock = (e: any) => {
        e.preventDefault();
        if (e.target.doorLock.value === this.state.pin) {
            writeThingspeak.get(`?field2=1`).then(
                (response) => {
                    console.log(response.data);
                    this.setState({ doorState: "1" },
                        () => {
                            alert("Unlocked!");
                        }
                    );
                }
            ).catch(
                (error) => {
                    console.log(error);
                    alert("Couldn't unlock the door");
                }
            );
        }
    }

    private changePin = (e: any) => {
        e.preventDefault();
        // console.log(e.target.newPin.value);
        if (e.target.newPin.value === e.target.confirmPin.value) {
            // this.setState({pin: e.target.newPin.value});
            console.log(e.target.oldPin.value + "\n" + this.state.pin);
            if (e.target.oldPin.value === this.state.pin) {
                writeThingspeak.get(`?field4=${e.target.newPin.value}`).then(
                    (response) => {
                        console.log(response.data);
                    }
                ).catch(
                    (error) => {
                        console.log(error);
                    }
                );
            } else {
                alert('Wrong Old PIN');
            }

            readThingspeak.get('4/last.json').then((response) => {
                this.setState({ pin: response.data.field4 },
                    () => {
                        alert('Successfully PIN Changed');
                    });
            });
        }
    }

    render() {
        return (
            <div className='ui container segment'>
                <h3>Door Lock System!</h3>
                <div className='ui field'>
                    {this.PinEntry()}
                </div>
                <hr />
                <form onSubmit={this.changePin}>
                    <div className='ui field'>
                        <label htmlFor="oldPin" className='label'>Old PIN:  </label>
                        <div className='ui input'>
                            <input type="password" id="oldPin" autoComplete="off" name="oldPin" />
                        </div>
                    </div>
                    <div className='ui field'>
                        <label htmlFor="newPin" className='label'>New PIN:  </label>
                        <div className='ui input'>
                            <input type="password" id="newPin" autoComplete="off" name="newPin" />
                        </div>
                    </div>
                    <div className='ui field'>
                        <label htmlFor="confirmPin" className='label'>Confirm PIN:  </label>
                        <div className='ui input'>
                            <input type="password" id="confirmPin" autoComplete="off" name="confirmPin" />
                        </div>
                    </div>
                    <button className='ui button secondary' type='submit'>Change PIN</button>
                </form>

            </div>
        )
    }
}


