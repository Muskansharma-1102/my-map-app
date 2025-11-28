import { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Map from './components/Map';
import { useMap } from './hooks/useMap';

function App() {
  const { features, addFeature } = useMap();
  const [wmsVisible, setWmsVisible] = useState(true);

  const handleDrawPolygon = () => {
    // Triggered from Sidebar; drawing handled in Map component
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1">
        <Sidebar onToggleWms={setWmsVisible} onDrawPolygon={handleDrawPolygon} />
        <Map features={features} onAddFeature={addFeature} wmsVisible={wmsVisible} />
      </div>
    </div>
  );
}

export default App;