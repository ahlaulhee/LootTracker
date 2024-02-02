/// <reference types="vite/client" />

export interface Character {
  id: number;
  name: string;
  class: string;
  items: Item[];
}

export interface Item {
  id: number;
  name: string;
  tier: string;
  image: string;
  type: string;
  specificType: string;
  obtained: boolean;
  obtainedDate: Date | null;
}
