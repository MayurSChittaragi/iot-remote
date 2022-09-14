import React from 'react';
import LightButton from './LightButton';
import { writeThingspeak } from '../api/thingspeak';
import FireAlarm from './FireAlarm';
import DoorLock from './DoorLock';

function App() {
  //light: "ON" | "OFF" | "AUTO" field1
  const [lightState, setLightState] = React.useState("");

  const convertLightTerm = (s: string) => {
    switch (s) {
      case "ON": return 0;
      case "OFF": return 1;
      case "AUTO": return 2;
      default: return 1;
    }
  }

  const getLightProp = async (term: string) => {
    setLightState(term);
    // console.log(term);
    const code = convertLightTerm(term);
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

  return (
    <div className="App">
      <LightButton getLightProp={getLightProp} />
      <FireAlarm />
      <DoorLock />
    </div>
  );
}

export default App;
