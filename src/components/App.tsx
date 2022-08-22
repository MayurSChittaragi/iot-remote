import React from 'react';
import LightButton from './LightButton';
function App() {

  const [lightState, setLightState] = React.useState("");
  const getLightProp = (term: string) => {
    setLightState(term);
  }

  return (
    <div className="App">
      <LightButton getLightProp={getLightProp}/>
    </div>
  );
}

export default App;
