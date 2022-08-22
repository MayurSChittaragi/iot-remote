import React from "react";


class LightButton extends React.Component<any, any> {
    state: any = {
        buttonState: "",
    }


    private handleSubmit = async (btnState: string) => {
        console.log("lightState changed!");
        await this.setState({ buttonState: btnState });
        this.props.getLightProp(this.state.buttonState);
    }

    render() {
        return (
            <div className="ui container segment">
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