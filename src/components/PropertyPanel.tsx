import React from 'react';
import { useStore } from '../state/store';

const PropertyPanel: React.FC = () => {
  const { selectedCard, includeColor, includeText } = useStore();

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedCard && includeColor) {
      selectedCard.updateColor(event.target.value);
    }
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedCard && includeText) {
      selectedCard.updateText(event.target.value);
    }
  };

  return (
    
    <div className="p-4">
      {selectedCard && (
        <>
          {includeColor && (
            <div>
              <label>Color: </label>
              <input type="color" onChange={handleColorChange} />
            </div>
          )}
          {includeText && (
            <div>
              <label>Text: </label>
              <input type="text" onChange={handleTextChange} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PropertyPanel;
