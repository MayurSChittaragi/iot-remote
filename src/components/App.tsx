import React from 'react';
import './App.css'
import LightButton from './LightButton';
import FireAlarm from './FireAlarm';
import DoorLock from './DoorLock';
import EmailList from "./EmailList";
function App() {
  return (
    <div className="App">
      <LightButton />
      <img src='light.gif' id="cur"></img>
      <FireAlarm />
      <DoorLock />
      <EmailList />
    </div>
  );
}

export default App;
