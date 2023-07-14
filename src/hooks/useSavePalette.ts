import { getPalettes, setPalette } from "../storage/palettes";
import { ColorProps } from "../App";

type SavePaletteProps = {
  colors: ColorProps[];
  edittingCurrentIndex: null | number;
  isEditting: boolean;
  setEdittingPalette: (isEditting: boolean) => void;
  setSavedColors: (colors: ColorProps[][]) => void;
  setColors: (colors: ColorProps[]) => void;
};

export function useSavePalette({
  colors,
  edittingCurrentIndex,
  isEditting,
  setEdittingPalette,
  setSavedColors,
  setColors,
}: SavePaletteProps): void {
  const lockColors = colors.map((color) => ({
    ...color,
    isLocked: true,
  }));

  const savedLocalColors = getPalettes();

  if (!savedLocalColors) {
    setPalette([lockColors]);

    return;
  }

  let newSavedColors: ColorProps[][] = [];

  if (isEditting) {
    newSavedColors = savedLocalColors.map((oldColor, index) => {
      if (index === edittingCurrentIndex) {
        return lockColors;
      }

      return oldColor;
    });
  } else {
    newSavedColors = [...savedLocalColors, lockColors];
  }

  if (isEditting) {
    setEdittingPalette(false);
    setSavedColors(newSavedColors);

    const unlockAllColors = newSavedColors.map((color) =>
      color.map((item) => ({ ...item, isLocked: false }))
    );

    setColors(unlockAllColors[edittingCurrentIndex || 0]);
  }

  setPalette(newSavedColors);

  return;
}
