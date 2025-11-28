import { useState } from 'react';

interface SidebarProps {
  onToggleWms: (visible: boolean) => void;
  onDrawPolygon: () => void;
}

const Sidebar = ({ onToggleWms, onDrawPolygon }: SidebarProps) => {
  const [wmsVisible, setWmsVisible] = useState(true);

  const handleToggle = () => {
    setWmsVisible(!wmsVisible);
    onToggleWms(!wmsVisible);
  };

  return (
    <aside className="w-64 bg-gray-100 p-4 h-full">
      <h2 className="text-lg font-semibold mb-4">Layer Management</h2>
      <label className="flex items-center mb-2">
        <input type="checkbox" checked={wmsVisible} onChange={handleToggle} className="mr-2" />
        WMS Layer
      </label>
      <button onClick={onDrawPolygon} className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
        Draw Polygon (AOI)
      </button>
    </aside>
  );
};

export default Sidebar;