import React from 'react';
import { useStore } from '../state/store';
import { Card } from './Card';

const Toolbar: React.FC = () => {
  const { canvas, includeColor, includeText } = useStore();

  const addNewCard = () => {
    if (canvas) {
      const card = new Card({
        left: 50,
        top: 50,
        color: includeColor ? 'white' : undefined,
        text: includeText ? 'New Card' : undefined,
      });
      canvas.add(card);
      canvas.setActiveObject(card);
      useStore.getState().setSelectedCard(card);
    }
  };

  return (
    <div>
      <button onClick={addNewCard} className="p-2 m-2 bg-blue-500 text-white">Add Card</button>
    </div>
  );
};

export default Toolbar;
