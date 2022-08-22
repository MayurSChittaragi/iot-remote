import React from "react";


class LightButton extends React.Component {
    state: any = {
        buttonState: "",
    }

    render() {
        return (
            <div className="ui container segment">
                <div className="ui form">
                    <div className="inline fields">
                        <label>Lights: </label>
                        <div className="field">
                            <div className="ui radio checkbox">
                                <input type="radio" name="frequency" />
                                <label>ON</label>
                            </div>
                        </div>
                        <div className="field">
                            <div className="ui radio checkbox">
                                <input type="radio" name="frequency" />
                                <label>OFF</label>
                            </div>
                        </div>
                        <div className="field">
                            <div className="ui radio checkbox">
                                <input type="radio" name="frequency" />
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