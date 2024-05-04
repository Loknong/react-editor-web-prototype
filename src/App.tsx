import React from 'react';
import Toolbar from './components/Toolbar';
import PropertyPanel from './components/PropertyPanel';
import CanvasComponent from './components/CanvasComponent';
import { useStore } from './state/store';

function App() {
  const { includeColor, setIncludeColor, includeText, setIncludeText } = useStore();

  return (
    <div className="flex">
      <Toolbar />
      <CanvasComponent />
      <div>
        <button onClick={() => setIncludeColor(!includeColor)} className="p-2 m-2 bg-blue-500 text-white">
          Toggle Color
        </button>
        <button onClick={() => setIncludeText(!includeText)} className="p-2 m-2 bg-blue-500 text-white">
          Toggle Text
        </button>
      </div>
      <PropertyPanel />
    </div>
  );
}

export default App;
