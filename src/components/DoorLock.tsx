import React, { Component } from 'react'

export default class DoorLock extends Component {
    state: any = {
        doorState: "",
        pin: "",
    };

    changePin = (e: any) => {
        e.preventDefault();
        // console.log(e.target.newPin.value);
        if(e.target.newPin.value === e.target.confirmPin.value){
            // this.setState({pin: e.target.newPin.value});
            
            console.log(this.state.pin);
        }
    }

    render() {
        return (
            <div className='ui container segment'>
                <div className='ui field'>
                    <label htmlFor="doorLock" className='label'>Door Lock</label>
                    <div className='ui input'>
                        <input type="password" id="doorLock" autoComplete="off" name="doorLock" onChange={e => this.setState({
                            doorState: e.target.value
                        })} />
                        <button className='ui button primary'>UnLock</button>
                    </div>
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


