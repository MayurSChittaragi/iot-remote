import React from 'react';
import LightButton from './LightButton';
import FireAlarm from './FireAlarm';
import DoorLock from './DoorLock';
import EmailList from "./EmailList";
function App() {
  return (
    <div className="App">
      <LightButton />
      <FireAlarm />
      <DoorLock />
      <EmailList />
    </div>
  );
}

export default App;
