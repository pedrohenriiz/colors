import { useEffect, useState, useCallback } from "react";
import { Header } from "./components/Header";
import { generateRandomColor } from "./utils/generateRandomColor";

import "./styles/global.css";
import { useSavePalette } from "./hooks/useSavePalette";
import { useGetPalettes } from "./hooks/useGetPalettes";
import { useRemovePalette } from "./hooks/useRemovePalette";
import { SavedPalette } from "./components/SavedPalette";
import { HeroWelcome } from "./components/HeroWelcome";
import { PalettesSection } from "./components/PalettesSection";
import { HeroPalette } from "./components/HeroPalette";

export type ColorProps = {
  color: string;
  index: number;
  isLocked: boolean;
};

function App() {
  const [colors, setColors] = useState<ColorProps[]>([]);
  const [isEditting, setIsEditting] = useState(false);
  const [savedColors, setSavedColors] = useState<ColorProps[][]>(
    useGetPalettes()
  );
  const [edittingCurrentColorIndex, setEdittingCurrentColorIndex] = useState<
    number | null
  >(null);

  const generateColors = useCallback(() => {
    setColors((oldColors) => {
      const newColors = [];

      for (let i = 0; i < 5; i++) {
        const selectOldColor = oldColors[i];

        if (selectOldColor?.isLocked) {
          newColors.push(selectOldColor);
          continue;
        }

        const generatedRandomColor = generateRandomColor();

        newColors.push({
          index: i,
          color: generatedRandomColor,
          isLocked: false,
        });
      }

      return newColors;
    });
  }, []);

  const updateSingleColor = useCallback((index: number) => {
    const generatedColor = generateRandomColor();

    setColors((oldColors) => {
      const updateColors = oldColors.map((item) => {
        if (item.isLocked) {
          return item;
        }

        if (Number(index) === item.index) {
          return { ...item, color: generatedColor };
        }

        return item;
      });

      return updateColors;
    });

    return;
  }, []);

  const lockUnlockColor = useCallback((index: number) => {
    setColors((oldColors) => {
      const updateColors = oldColors.map((item) => {
        if (Number(index) === item.index) {
          return { ...item, isLocked: !item.isLocked };
        }

        return item;
      });

      return updateColors;
    });
  }, []);

  function savePalette() {
    useSavePalette({
      colors,
      edittingCurrentIndex: edittingCurrentColorIndex,
      isEditting: isEditting,
      setEdittingPalette: setIsEditting,
      setSavedColors,
      setColors,
    });

    if (!isEditting) {
      setSavedColors((prevColors) => [...prevColors, colors]);
    }
  }

  function handleSetPaletteOnEditting(
    selectedPalette: ColorProps[],
    index: number
  ) {
    const lockAllSelectedColors = selectedPalette.map((palette) => ({
      ...palette,
      isLocked: true,
    }));

    setColors(lockAllSelectedColors);
    setIsEditting(true);
    setEdittingCurrentColorIndex(index);
  }

  function handleDeletePalette(index: number) {
    useRemovePalette({
      removingCurrentIndex: index,
      isEditting,
      setColors,
      setIsEditting,
      setSavedColors,
    });
  }

  useEffect(() => {
    generateColors();
  }, []);

  return (
    <div className="px-5 mx-auto lg:max-w-7xl">
      <Header />

      <section className="container mx-auto flex justify-between items-center flex-col lg:flex-row lg:justify-between">
        <HeroWelcome generateColors={generateColors} />

        <HeroPalette
          colors={colors}
          lockUnlockColor={lockUnlockColor}
          updateSingleColor={updateSingleColor}
          generateColors={generateColors}
          savePalette={savePalette}
          isEditting={isEditting}
        />
      </section>

      {savedColors.length > 0 && <PalettesSection />}

      <section className="flex flex-col mx-auto mb-10">
        <div className="flex flex-col gap-5 flex-1 mx-auto md:flex-row md:flex-wrap md:justify-center md:mx-auto md:items-center xl:justify-start xl:items-start">
          {savedColors.map((item: any, index) => {
            const generatedKey = new Date().getTime() + Math.random();

            return (
              <SavedPalette
                item={item}
                index={index}
                handleDeletePalette={handleDeletePalette}
                handleSetPaletteOnEditting={handleSetPaletteOnEditting}
                key={generatedKey}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default App;
