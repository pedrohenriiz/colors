import { getPalettes, setPalette } from "../storage/palettes";
import { ColorProps } from "../App";

type RemovePaletteProps = {
  removingCurrentIndex: number;
  isEditting: boolean;
  setColors: React.Dispatch<React.SetStateAction<ColorProps[]>>;
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
    (element, colorIndex) => colorIndex !== removingCurrentIndex
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
