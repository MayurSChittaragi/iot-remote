import React from "react";


import { writeThingspeak } from "../api/thingspeak";

class EmailList extends React.Component<any, any> {
    state: any = {
        email: '',
        verified: false,
        alertText: 'Email is Invalid',
    };



    verifyEmail = () => {
        const email = this.state.email;
        const regex = new RegExp("^[a-zA-Z0-9]+@[a-zA-Z0-9]+.[A-Za-z]+$");
        const result = regex.test(email);
        
        if (result) {
            this.setState({ alertText: "Email is valid", verified: true });
        }
        else {
            this.setState({ alertText: "Email is invalid", verified: false });
        }
    }

    onSubmit = (e: any) => {
        e.preventDefault();
        (document.getElementsByTagName("body")[0] as HTMLBodyElement).style.backgroundColor = "white";
        (document.getElementById("cur") as HTMLInputElement).style.opacity = '0';
        setTimeout(()=>{(document.getElementById("cur") as HTMLInputElement).style.opacity = '1';(document.getElementById("cur") as HTMLInputElement).src = 'mail_go.gif';},500);
        if (this.state.verified) {
            writeThingspeak.get(`?field5=${this.state.email}`).then(
                (response) => {
                    console.log(response.data);
                    //alert("Successfully Subscribed!")
                    setTimeout(()=>{
                        (document.getElementById("cur") as HTMLInputElement).src = 'mail_sent.gif';
                    },2000)
                    setTimeout(()=>{
                        (document.getElementsByTagName("body")[0] as HTMLBodyElement).style.backgroundColor = "black";
                        (document.getElementById("cur") as HTMLInputElement).style.opacity = '0';(document.getElementById("cur") as HTMLInputElement).style.height = '20vw';(document.getElementById("cur") as HTMLInputElement).style.width = '20vw';
                        setTimeout(()=>{(document.getElementById("cur") as HTMLInputElement).style.opacity = '1';(document.getElementById("cur") as HTMLInputElement).src = 'light.gif';},500)
                    }, 3400);
                }
            ).catch(
                (error) => {
                    console.log(error);
                }
            );
        }
    }

    ViewSubmit = () => {
        if (this.state.verified) {
            return (
                <div>
                    <p>{this.state.alertText}</p>
                    <button className="ui button teritiary" onClick={this.onSubmit}>Submit</button>
                </div>
            );
        }
        else {
            return <div>
                <p>{this.state.alertText}</p>
            </div>
        }
    }


    render() {
        return (
            <div className="ui container segment email" style={{left:"70px"}}>
                <h3>Email Updates Subscription: </h3>
                <div className="ui form">
                    <div className="field">
                        {/* <label>Email</label> */}
                        <input type="text" name="email" placeholder="Email" onChange={(e) => {
                            e.preventDefault();
                            this.setState({ email: e.target.value });
                            this.verifyEmail();
                        }} />
                        <div>
                            {this.ViewSubmit()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default EmailList;