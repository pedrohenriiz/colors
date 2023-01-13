import { useEffect, useState, useCallback } from 'react';
import { Header } from './components/Header';
import { generateRandomColor } from './utils/generateRandomColor';

import './styles/global.css';
import { useSavePalette } from './hooks/useSavePalette';
import { useGetPalettes } from './hooks/useGetPalettes';
import { useRemovePalette } from './hooks/useRemovePalette';
import { SaveEditPalette } from './components/SaveEditPalette';
import { GeneratedPaletteGrid } from './components/GeneratedPaletteGrid';
import { SavedPalette } from './components/SavedPalette';

export type ColorProps = {
  color: string;
  index: number;
  isLocked: boolean;
};

const COLORS_POSITIONS = [0, 1, 2, 3, 4];

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

      for (let i = 0; i < COLORS_POSITIONS.length; i++) {
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
    <div className='px-5 mx-auto lg:max-w-7xl'>
      <Header />

      <section className='container mx-auto flex justify-between items-center flex-col lg:flex-row lg:justify-between'>
        <div className='flex flex-col lg:mr-4'>
          <h1 className='font-bold text-xl text-center md:text-3xl lg:text-6xl lg:text-left lg:max-w-lg'>
            Generate color palettes <span className='text-blue'>quickly!</span>
          </h1>

          <p className='text-center text-gray-500 mt-4 md:mt-6 lg:text-left lg:text-lg'>
            Generate random palettes, customize it on your own and save it to
            use later!
          </p>

          <button
            className='hidden border-solid border-2 w-fit border-black bg-blue text-white px-3 py-2 rounded-[4px] mt-6 text-lg lg:block'
            style={{ boxShadow: '2px 2px 0px 0px #000000' }}
            onClick={generateColors}
          >
            Generate
          </button>
        </div>

        <div className='container flex flex-col items-center sm:px-6 mx-auto mt-10 sm:mt-14 lg:max-w-lg lg:pr-0'>
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
      </section>

      <header className='w-full pt-10 mb-5 flex justify-center items-center md:p-12 md:mb-0 lg:p-16'>
        <p className='text-4xl text-blue font-bold'>Your palettes</p>
      </header>

      <section className='flex flex-col mx-auto mb-10'>
        <div className='flex flex-col gap-5 flex-1 mx-auto md:flex-row md:flex-wrap md:justify-center md:mx-auto md:items-center xl:justify-start xl:items-start'>
          {savedColors.map((item: any, index) => {
            return (
              <SavedPalette
                item={item}
                index={index}
                handleDeletePalette={handleDeletePalette}
                handleSetPaletteOnEditting={handleSetPaletteOnEditting}
                key={new Date().getTime() + Math.random()}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default App;
