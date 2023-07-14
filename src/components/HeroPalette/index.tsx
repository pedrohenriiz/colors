import { ColorProps } from "../../App";

import { GeneratedPaletteGrid } from "../GeneratedPaletteGrid";
import { SaveEditPalette } from "../SaveEditPalette";

type HeroPaletteProps = {
  colors: ColorProps[];
  isEditting: boolean;
  lockUnlockColor: (index: number) => void;
  updateSingleColor: (index: number) => void;
  generateColors: () => void;
  savePalette: () => void;
};

export function HeroPalette({
  colors,
  lockUnlockColor,
  updateSingleColor,
  generateColors,
  savePalette,
  isEditting,
}: HeroPaletteProps) {
  return (
    <div className="container flex flex-col items-center sm:px-6 mx-auto mt-10 sm:mt-14 md:max-w-lg lg:pr-0">
      <GeneratedPaletteGrid
        colors={colors}
        lockUnlockColor={lockUnlockColor}
        updateSingleColor={updateSingleColor}
      />

      <SaveEditPalette
        generateColors={generateColors}
        savePalette={savePalette}
        isEditting={isEditting}
      />
    </div>
  );
}
