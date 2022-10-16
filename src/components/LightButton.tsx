import React from "react";
import { writeThingspeak } from '../api/thingspeak';
import "./LightButton.css"


const convertLightTerm = (s: string) => {
    switch (s) {
        case "ON":
            (document.getElementById("cur") as HTMLInputElement).src = 'light_on.gif';
            setTimeout(()=>{(document.getElementById("cur") as HTMLInputElement).src = 'light.gif';}, 1400);
            
            (document.getElementById("light") as HTMLInputElement).style.backgroundColor = "yellow";
            return 0;
        case "OFF": 
            (document.getElementById("cur") as HTMLInputElement).src = 'light_off.gif';
            setTimeout(()=>{(document.getElementById("cur") as HTMLInputElement).src = 'light.gif';}, 1100);
            (document.getElementById("light") as HTMLInputElement).style.backgroundColor = "rgb(108, 231, 108)"
            return 1;
        case "AUTO": 
            (document.getElementById("light") as HTMLInputElement).style.backgroundColor = "blue"
            return 2;
        default: return 1;
    }
}

class LightButton extends React.Component<any, any> {

    state: any = {
        buttonState: "OFF",
        lightState: ""
    }


    private handleSubmit = async (btnState: string) => {
        this.setState({ buttonState: btnState });
        console.log("My")
        console.log(this)
        const code = convertLightTerm(btnState);
        await writeThingspeak.get(`?field1=${code}`).then(
            (response) => {
                console.log(response.data);
            }
        ).catch(
            (error) => {
                console.log(error);
            }
        );
    }
    
    render() {
        return (
            <div className="ui container segment light" id="light">
                <h3>Lights System   </h3>
                <div className="ui form">
                    <div className="inline fields">
                        <label>Lights: </label>
                        <div className="field">
                            <div className="ui toggle checkbox">
                                <div id="off">OFF</div>
                                <input type="checkbox" id="entry" className="ui toggle checkbox" name="frequency" onChange={
                                    (e) => {
                                        if(this.state.buttonState !== "AUTO"){
                                            if (this.state.buttonState === "OFF") {
                                                this.handleSubmit("ON");
                                            }
                                            else{
                                                this.handleSubmit("OFF");
                                            }
                                        }
                                        console.log("HERE")
                                        console.log(this)

                                    }
                                } />
                                <label>ON</label>
                            </div>
                        </div>
                            <div className="ui radio checkbox">
                                <input type="checkbox" id="auto" className="ui radio checkbox" name="frequency" onChange={
                                    (e) => {
                                        console.log("Auto")
                                        console.log(this)
                                        if (this.state.buttonState === "AUTO") {
                                            if ((document.getElementById("entry") as HTMLInputElement).checked) {
                                                this.handleSubmit("ON");
                                            }
                                            else{
                                                this.handleSubmit("OFF");
                                            }
                                        }
                                        else{
                                            this.handleSubmit("AUTO");
                                        }
                                        console.log("Outside")
                                        console.log(this)

                                    }
                                } />
                                <label>Auto</label>
                            </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LightButton;