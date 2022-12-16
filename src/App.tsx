import { useEffect, useState, useCallback } from 'react';
import { Header } from './components/Header';
import GeneratedColor from './components/GeneratedColor';
import { generateRandomColor } from './utils/generateRandomColor';

import './styles/global.css';

type ColorProps = {
  color: string;
  index: number;
  isLocked: boolean;
};

const COLORS_POSITIONS = [0, 1, 2, 3, 4];

function App() {
  const [colors, setColors] = useState<ColorProps[]>([]);

  const generateColors = useCallback(() => {
    setColors(() => {
      const newColors = [];

      for (let i = 0; i < COLORS_POSITIONS.length; i++) {
        // TODO: Ver o caso onde alguma cor esta bloqueada
        // if (previousColors[i]?.index === i) {
        //   continue;
        // }

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
        if (Number(index) === item.index) {
          return { ...item, color: generatedColor };
        }

        return item;
      });

      return updateColors;
    });

    return;
  }, []);

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

        <div className='container flex flex-col items-center px-6 mx-auto mt-10 sm:mt-14 lg:max-w-lg'>
          <div
            className='flex flex-col border-solid w-full border-4 border-black max-w-lg md:flex-row'
            style={{ boxShadow: '8px 8px 0px 0px #000000' }}
          >
            {colors.map((item) => (
              <GeneratedColor
                key={item.index}
                color={item.color}
                updateColor={updateSingleColor}
                index={item.index}
                isLocked={item.isLocked}
              />
            ))}
          </div>

          <div className='mt-14 flex flex-col space-x-0 space-y-8 sm:mt-11 sm:flex-row sm:space-y-0 sm:space-x-32 lg:space-x-0 lg:items-center'>
            <button
              className='border-solid border-2 w-fit self-center border-black bg-blue text-white px-3 py-2 rounded-[4px] text-lg lg:hidden'
              style={{ boxShadow: '2px 2px 0px 0px #000000' }}
            >
              Generate
            </button>

            <button
              className='border-solid border-2 w-fit self-center border-blue bg-white text-blue px-3 py-2 rounded-[4px] text-lg font-bold'
              style={{ boxShadow: '2px 2px 0px 0px #6CA1D1' }}
            >
              Save palette
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
