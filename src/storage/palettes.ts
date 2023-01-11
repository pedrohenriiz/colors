import { ColorProps } from '../App';
import { PALETTES } from './storageConfig';

export function getPalettes(): ColorProps[][] {
  const storage = localStorage.getItem(PALETTES);

  const palettes = storage ? JSON.parse(storage) : [];

  return palettes;
}

export function setPalette(palette: ColorProps[][]) {
  const parsePalettes = JSON.stringify(palette);

  localStorage.setItem(PALETTES, parsePalettes);
}

// TODO: encontrar uma tipagem condizente
export function removePalette(paletteIndex: number) {
  const palettes = getPalettes();

  const removePalette = palettes.filter(
    (palette: any) => palette.index !== paletteIndex
  );

  const parsePalettes = JSON.stringify(removePalette);

  localStorage.setItem(PALETTES, parsePalettes);
}
