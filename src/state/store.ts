import create from 'zustand';
import { fabric } from 'fabric';
import { Card } from '../components/Card'; 

interface StoreState {
  canvas: fabric.Canvas | null;
  setCanvas: (canvas: fabric.Canvas | null) => void;
  selectedCard: Card | null;
  setSelectedCard: (card: Card | null) => void;
  includeColor: boolean;
  setIncludeColor: (value: boolean) => void;
  includeText: boolean;
  setIncludeText: (value: boolean) => void;
}

export const useStore = create<StoreState>((set) => ({
  canvas: null,
  setCanvas: (canvas) => set({ canvas }),
  selectedCard: null,
  setSelectedCard: (card) => set({ selectedCard: card }),
  includeColor: true,
  setIncludeColor: (value) => set({ includeColor: value }),
  includeText: true,
  setIncludeText: (value) => set({ includeText: value })
}));
