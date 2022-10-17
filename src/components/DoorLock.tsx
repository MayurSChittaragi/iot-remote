import React, { Component } from 'react'
import { readThingspeak, writeThingspeak } from '../api/thingspeak';
import "./DoorLock.css"



export default class DoorLock extends Component {
    state: any = {
        doorState: "0",
        pin: "",
    };

    PinEntry = () => {
        if (this.state.doorState === "0") {    //LOCKED
            return (
                <form onSubmit={this.unlock}>
                    <div className='ui input' id='pinEnt'>
                        <button type='submit' className='ui button primary' id="send"></button>
                        <input type="checkbox" id="lock" defaultChecked={true} onClick={() => {(document.getElementById("lock") as HTMLInputElement).checked=true;(document.getElementById("send") as HTMLInputElement).click()}} />
                        <label htmlFor="lock"><i></i></label>
                        <input type="password" id="doorLock" autoComplete="off" name="doorLock" />
                    </div>  
                </form>
            )
        }
        else if (this.state.doorState === "1") {
            //it is unlocked, we have to lock it.
            return (
                <div id='unlockEnt'>
                    <input type="checkbox" id="lock" defaultChecked={false} onClick={this.lock} />
                    <label htmlFor="lock"><i></i></label>
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
        (document.getElementsByTagName("body")[0] as HTMLBodyElement).style.backgroundColor = "rgba(68,203,246,255)";
        (document.getElementById("cur") as HTMLInputElement).style.opacity = '0';
        setTimeout(()=>{(document.getElementById("cur") as HTMLInputElement).style.opacity = '1';(document.getElementById("cur") as HTMLInputElement).src = 'lock.gif';},500);
        setTimeout(()=>{
            (document.getElementsByTagName("body")[0] as HTMLBodyElement).style.backgroundColor = "black";
            (document.getElementById("cur") as HTMLInputElement).style.opacity = '0';
            setTimeout(()=>{(document.getElementById("cur") as HTMLInputElement).style.opacity = '1';(document.getElementById("cur") as HTMLInputElement).src = 'light.gif';},500)
            }, 2000);
        writeThingspeak.get(`?field2=0`).then(
            (response) => {
                console.log(response.data);
                this.setState({ doorState: "0" },
                    () => {
                        
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
            (document.getElementById("lock") as HTMLInputElement).checked=false;
            (document.getElementsByTagName("body")[0] as HTMLBodyElement).style.backgroundColor = "rgba(68,203,246,255)";
            (document.getElementById("cur") as HTMLInputElement).style.opacity = '0';
            setTimeout(()=>{(document.getElementById("cur") as HTMLInputElement).style.opacity = '1';(document.getElementById("cur") as HTMLInputElement).src = 'unlock.gif';},500);
            setTimeout(()=>{
                (document.getElementsByTagName("body")[0] as HTMLBodyElement).style.backgroundColor = "black";
                (document.getElementById("cur") as HTMLInputElement).style.opacity = '0';
                setTimeout(()=>{(document.getElementById("cur") as HTMLInputElement).style.opacity = '1';(document.getElementById("cur") as HTMLInputElement).src = 'light.gif';},500)
                }, 3000);
            writeThingspeak.get(`?field2=1`).then(
                (response) => {
                    console.log(response.data);
                    this.setState({ doorState: "1" },
                        () => {

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
        (document.getElementsByTagName("body")[0] as HTMLBodyElement).style.backgroundColor = "white";
        (document.getElementById("cur") as HTMLInputElement).style.opacity = '0';
        setTimeout(()=>{(document.getElementById("cur") as HTMLInputElement).style.opacity = '1';(document.getElementById("cur") as HTMLInputElement).src = 'pass.gif';},500);
        if (e.target.newPin.value === e.target.confirmPin.value) {
            // this.setState({pin: e.target.newPin.value});
            console.log(e.target.oldPin.value + "\n" + this.state.pin);

            if (e.target.oldPin.value === this.state.pin) {
                writeThingspeak.get(`?field4=${e.target.newPin.value}`).then(
                    (response) => {
                        setTimeout(()=>{(document.getElementById("cur") as HTMLInputElement).src = 'thumbs.gif';},2000);
                        setTimeout(()=>{
                            (document.getElementsByTagName("body")[0] as HTMLBodyElement).style.backgroundColor = "black";
                            (document.getElementById("cur") as HTMLInputElement).style.opacity = '0';(document.getElementById("cur") as HTMLInputElement).style.height = '20vw';(document.getElementById("cur") as HTMLInputElement).style.width = '20vw';
                            setTimeout(()=>{(document.getElementById("cur") as HTMLInputElement).style.opacity = '1';(document.getElementById("cur") as HTMLInputElement).src = 'light.gif';},500)
                        }, 3500);
                        console.log(response.data);
                    }
                ).catch(
                    (error) => {
                        console.log(error);
                        
                        setTimeout(()=>{
                            alert("Server Error");
                            (document.getElementsByTagName("body")[0] as HTMLBodyElement).style.backgroundColor = "black";
                            (document.getElementById("cur") as HTMLInputElement).style.opacity = '0';(document.getElementById("cur") as HTMLInputElement).style.height = '20vw';(document.getElementById("cur") as HTMLInputElement).style.width = '20vw';
                            setTimeout(()=>{(document.getElementById("cur") as HTMLInputElement).style.opacity = '1';(document.getElementById("cur") as HTMLInputElement).src = 'light.gif';},500)
                        }, 3500);
                    }
                );
            } else {
                
                setTimeout(()=>{
                    alert('Wrong Old PIN');
                    (document.getElementsByTagName("body")[0] as HTMLBodyElement).style.backgroundColor = "black";
                    (document.getElementById("cur") as HTMLInputElement).style.opacity = '0';(document.getElementById("cur") as HTMLInputElement).style.height = '20vw';(document.getElementById("cur") as HTMLInputElement).style.width = '20vw';
                    setTimeout(()=>{(document.getElementById("cur") as HTMLInputElement).style.opacity = '1';(document.getElementById("cur") as HTMLInputElement).src = 'light.gif';},500)
                }, 3500);
            }

            readThingspeak.get('4/last.json').then((response) => {
                this.setState({ pin: response.data.field4 },
                    () => {
                        
                    });
            });
        }else{
            
            setTimeout(()=>{
                alert("Confirm Pin does not match");
                (document.getElementsByTagName("body")[0] as HTMLBodyElement).style.backgroundColor = "black";
                (document.getElementById("cur") as HTMLInputElement).style.opacity = '0';(document.getElementById("cur") as HTMLInputElement).style.height = '20vw';(document.getElementById("cur") as HTMLInputElement).style.width = '20vw';
                setTimeout(()=>{(document.getElementById("cur") as HTMLInputElement).style.opacity = '1';(document.getElementById("cur") as HTMLInputElement).src = 'light.gif';},500)
            }, 3500);
        }
    }

    render() {
        return (
            <div className='ui container segment'>
                <h3>Door Lock System</h3>
                <div className='ui field'>
                    {this.PinEntry()}
                </div>
                <hr />
                <form onSubmit={this.changePin}>
                    <div className='ui field'>
                        <label htmlFor="oldPin" className='label'>Old PIN:  </label>
                        <div className='ui input' id="oldPin">
                            <input type="password" id="oldPin" autoComplete="off" name="oldPin" />
                        </div>
                    </div>
                    <div className='ui field'>
                        <label htmlFor="newPin" className='label'>New PIN:  </label>
                        <div className='ui input' id="newPin">
                            <input type="password" id="newPin" autoComplete="off" name="newPin" />
                        </div>
                    </div>
                    <div className='ui field'>
                        <label htmlFor="confirmPin" className='label'>Confirm PIN:  </label>
                        <div className='ui input' id="confirmPin">
                            <input type="password" id="confirmPin" autoComplete="off" name="confirmPin" />
                        </div>
                    </div>
                    <button className='ui button secondary' type='submit'>Change PIN</button>
                </form>

            </div>
        )
    }
}


