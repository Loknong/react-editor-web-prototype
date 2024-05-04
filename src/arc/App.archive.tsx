import React, { useEffect, useState } from "react";
import { fabric } from "fabric";

interface CardOptions extends fabric.IGroupOptions {
  color?: string;
  text?: string;
}

class Card extends fabric.Group {
  constructor(options: CardOptions) {
    const items: fabric.Object[] = [];

    if (options.color) {
      const rect = new fabric.Rect({
        fill: options.color,
        width: 200,
        height: 100,
        hasControls: true,
      });
      items.push(rect);
    }

    if (options.text) {
      const text = new fabric.Text(options.text, {
        fontSize: 20,
        originX: "center",
        originY: "center",
        top: 50,
        left: 100,
      });
      items.push(text);
    }

    super(items, {
      selectable: true,
      ...options,
    });
  }

  updateColor(newColor: string) {
    const rect = this.item(0) as fabric.Rect;
    rect.set("fill", newColor);
    this.dirty = true;
    this.canvas?.renderAll();
  }

  updateText(newText: string) {
    const text = this.item(1) as unknown as fabric.Text;
    text.set("text", newText);
    this.dirty = true;
    this.canvas?.renderAll();
  }
}

function App() {
  const [canvas, setCanvas] = useState<fabric.Canvas>();
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [includeColor, setIncludeColor] = useState(true);
  const [includeText, setIncludeText] = useState(true);

  useEffect(() => {
    const initCanvas = new fabric.Canvas("c");
    setCanvas(initCanvas);

    initCanvas.on("mouse:down", (options) => {
      if (options.target) {
        setSelectedCard(options.target as Card);
      } else {
        setSelectedCard(null);
      }
    });

    return () => {
      initCanvas.dispose();
    };
  }, []);

  const addNewCard = () => {
    const card = new Card({
      left: 50,
      top: 50,
      color: includeColor ? "white" : undefined,
      text: includeText ? "New Card" : undefined,
    });
    canvas?.add(card);
    canvas?.setActiveObject(card);
    setSelectedCard(card);
  };

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
    <div className="flex">
      <div>
        <button onClick={addNewCard} className="p-2 m-2 bg-blue-500 text-white">
          Add Card
        </button>
        <div>
          <input
            type="checkbox"
            checked={includeColor}
            onChange={() => setIncludeColor(!includeColor)}
          />{" "}
          Color
          <input
            type="checkbox"
            checked={includeText}
            onChange={() => setIncludeText(!includeText)}
          />{" "}
          Text
        </div>
      </div>
      <canvas
        id="c"
        width="800"
        height="600"
        style={{ border: "1px solid #ccc" }}
      ></canvas>
      {selectedCard && (
        <div className="p-4">
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
        </div>
      )}
    </div>
  );
}

export default App;
