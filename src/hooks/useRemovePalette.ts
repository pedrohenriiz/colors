import { getPalettes, setPalette, removePalette } from '../storage/palettes';
import { ColorProps } from '../App';

type RemovePaletteProps = {
  removingCurrentIndex: number;
  isEditting: boolean;
  setColors: (color: any) => void;
  setIsEditting: (isEditting: boolean) => void;
  setSavedColors: (colors: ColorProps[][]) => void;
};

export function useRemovePalette({
  removingCurrentIndex,
  isEditting,
  setColors,
  setIsEditting,
  setSavedColors,
}: RemovePaletteProps) {
  const savedLocalColors = getPalettes();

  const removeColorByIndex = savedLocalColors.filter(
    (_, colorIndex) => colorIndex !== removingCurrentIndex
  );

  setPalette(removeColorByIndex);

  if (isEditting) {
    setColors((oldColors: ColorProps[]) => {
      return oldColors.map((color) => ({
        ...color,
        isLocked: false,
      }));
    });

    setIsEditting(false);
  }

  setSavedColors(removeColorByIndex);
}
