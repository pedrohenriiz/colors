import { useEffect, useState, useCallback } from 'react';
import { Header } from './components/Header';
import GeneratedColor from './components/GeneratedColor';
import { generateRandomColor } from './utils/generateRandomColor';
import { SavedColor } from './components/SavedColor';

import './styles/global.css';
import { useSavePalette } from './hooks/useSavePalette';
import { useGetPalettes } from './hooks/useGetPalettes';
import { useRemovePalette } from './hooks/useRemovePalette';

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
    console.log(selectedPalette);
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

        <div className='container flex flex-col items-center px-6 mx-auto mt-10 sm:mt-14 lg:max-w-lg lg:pr-0'>
          <div
            className='flex flex-col border-solid w-full border-4 border-black max-w-lg md:flex-row'
            style={{ boxShadow: '8px 8px 0px 0px #000000' }}
          >
            {colors.map((item) => (
              <GeneratedColor
                key={new Date().getTime() + Math.random()}
                color={item.color}
                updateColor={updateSingleColor}
                index={item.index}
                isLocked={item.isLocked}
                lockUnlockColor={lockUnlockColor}
              />
            ))}
          </div>

          <div className='mt-14 flex flex-col space-x-0 space-y-8 sm:mt-11 sm:flex-row sm:space-y-0 sm:space-x-32 lg:space-x-0 lg:items-center'>
            <button
              className='border-solid border-2 w-fit self-center border-black bg-blue text-white px-3 py-2 rounded-[4px] text-lg lg:hidden'
              style={{ boxShadow: '2px 2px 0px 0px #000000' }}
              onClick={generateColors}
            >
              Generate
            </button>

            <button
              className='border-solid border-2 w-fit self-center border-blue bg-white text-blue px-3 py-2 rounded-[4px] text-lg font-bold '
              style={{ boxShadow: '2px 2px 0px 0px #6CA1D1' }}
              onClick={savePalette}
            >
              {isEditting ? (
                <span>Edit palette</span>
              ) : (
                <span>Save Palette</span>
              )}
            </button>
          </div>
        </div>
      </section>

      <header className='w-full pt-10 mb-5 flex justify-center items-center md:p-12 md:mb-0 lg:p-16'>
        <p className='text-4xl text-blue font-bold'>Your palettes</p>
      </header>

      <section className='flex flex-col mx-auto mb-10'>
        <div className='flex flex-col gap-5 flex-1 mx-auto md:flex-row md:flex-wrap md:justify-center md:mx-auto md:items-center xl:justify-start xl:items-start'>
          {savedColors.map((item: any, index) => {
            return (
              <div
                className='flex flex-row relative border-solid w-full border-4 border-black max-w-[290px] group items-center justify-center'
                style={{ boxShadow: '2px 4px 0px 0px #000000' }}
                key={new Date().getTime() + Math.random()}
              >
                <SavedColor key={index} item={item} />

                <div className='hidden absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 group-hover:flex group-hover:flex-col group-hover:space-y-4'>
                  <button
                    className='border-2 border-solid border-black bg-gray-200 py-1 px-9 font-bold'
                    style={{ boxShadow: '1px 1px 0px 0px #000000' }}
                    onClick={() => handleSetPaletteOnEditting(item, index)}
                  >
                    Edit
                  </button>
                  <button
                    className='border-2 border-solid border-black bg-red py-1 px-9 font-bold text-white'
                    style={{ boxShadow: '1px 1px 0px 0px #000000' }}
                    onClick={() => handleDeletePalette(index)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default App;
