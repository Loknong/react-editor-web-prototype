import React, { useEffect } from 'react';
import { fabric } from 'fabric';
import { useStore } from '../state/store';
import { Card } from './Card';  // Make sure to import your Card class if it's not in the same file

const CanvasComponent: React.FC = () => {
  const { setCanvas, setSelectedCard } = useStore();

  useEffect(() => {
    const initCanvas = new fabric.Canvas('c');
    setCanvas(initCanvas);

    initCanvas.on('mouse:down', (options) => {
      // Ensure that the type assertion here is as specific as possible
      const isCard = options.target instanceof Card;
      if (isCard) {
        setSelectedCard(options.target as Card);
      } else {
        setSelectedCard(null);
      }
    });

    return () => {
      initCanvas.dispose();
      setCanvas(null);
    };
  }, [setCanvas, setSelectedCard]);

  return <canvas id="c" width="800" height="600" style={{ border: '1px solid #ccc' }}></canvas>;
};

export default CanvasComponent;
