import { ColorProps } from '../../App';

import GeneratedColor from '../GeneratedColor';

interface GeneratedPaletteGridProps {
  colors: ColorProps[];
  updateSingleColor: (index: number) => void;
  lockUnlockColor: (index: number) => void;
}

export function GeneratedPaletteGrid({
  colors,
  updateSingleColor,
  lockUnlockColor,
}: GeneratedPaletteGridProps) {
  return (
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
  );
}
