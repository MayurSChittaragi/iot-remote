import React from 'react';
import './App.css'
import LightButton from './LightButton';
import FireAlarm from './FireAlarm';
import DoorLock from './DoorLock';

function App() {
  return (
    <div className="App">
      <LightButton />
      <img src='light.gif' id="cur"></img>
      <FireAlarm />
      <DoorLock />
    </div>
  );
}

export default App;
