import { fabric } from 'fabric';

export interface CardOptions extends fabric.IGroupOptions {
  color?: string;
  text?: string;
}

export class Card extends fabric.Group {
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
        originX: 'center',
        originY: 'center',
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
