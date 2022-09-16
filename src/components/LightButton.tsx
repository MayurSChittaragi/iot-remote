import React from "react";
import { writeThingspeak } from '../api/thingspeak';


const convertLightTerm = (s: string) => {
    switch (s) {
        case "ON": return 0;
        case "OFF": return 1;
        case "AUTO": return 2;
    }
}

class LightButton extends React.Component<any, any> {

    state: any = {
        buttonState: "",
        lightState: ""
    }


    private handleSubmit = async (btnState: string) => {
        this.setState({ buttonState: btnState });

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
            <div className="ui container segment">
                <h3>Lights System!</h3>
                <div className="ui form">
                    <div className="inline fields">
                        <label>Lights: </label>
                        <div className="field">
                            <div className="ui radio checkbox">
                                <input type="radio" name="frequency" onChange={
                                    (e) => {
                                        if (e.target.value === "on") {
                                            this.handleSubmit("ON");
                                        }
                                    }
                                } />
                                <label>ON</label>
                            </div>
                        </div>
                        <div className="field">
                            <div className="ui radio checkbox">
                                <input type="radio" name="frequency" onChange={
                                    (e) => {
                                        if (e.target.value === "on") {
                                            this.handleSubmit("OFF");
                                        }
                                    }
                                } />
                                <label>OFF</label>
                            </div>
                        </div>
                        <div className="field">
                            <div className="ui radio checkbox">
                                <input type="radio" name="frequency" onChange={
                                    (e) => {
                                        if (e.target.value === "on") {
                                            this.handleSubmit("AUTO");
                                        }
                                    }
                                } />
                                <label>Auto</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LightButton;