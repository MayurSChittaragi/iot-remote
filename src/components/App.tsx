import React from 'react';
import './App.css'
import LightButton from './LightButton';
import FireAlarm from './FireAlarm';
import DoorLock from './DoorLock';
import EmailList from "./EmailList";
function App() {
  return (
    <div className="App">
      <div className='line'>
        <img src='light.gif' id="cur"></img>
      </div>
      <div className='line'>
        <LightButton />
        <FireAlarm />
        <DoorLock />
        <EmailList />
      </div>
    </div>
  );
}

export default App;
