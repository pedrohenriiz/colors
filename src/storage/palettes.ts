import { ColorProps } from "../App";
import { PALETTES } from "./storageConfig";

export function getPalettes() {
  const storage = localStorage.getItem(PALETTES);

  const palettes: ColorProps[][] | [] = storage ? JSON.parse(storage) : [];

  return palettes;
}

export function setPalette(palette: ColorProps[][]) {
  const parsePalettes = JSON.stringify(palette);

  localStorage.setItem(PALETTES, parsePalettes);
}
