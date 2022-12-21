import { memo } from 'react';

import { clsx } from 'clsx';
import {
  LockOpen,
  ArrowClockwise,
  Copy,
  Lock,
  IconProps as PRIconProps,
} from 'phosphor-react';

import { checkColorBrightnessProps } from '../../utils/checkColorBrightness';

interface GeneratedColorProps {
  color: string;
  updateColor: (index: number) => void;
  index: number;
  isLocked: boolean;
  lockUnlockColor: (index: number) => void;
}

interface IconProps extends PRIconProps {
  className: string;
  onClick: () => void;
}

function GeneratedColor({
  color,
  updateColor,
  index,
  isLocked,
  lockUnlockColor,
}: GeneratedColorProps) {
  const checkColorBrightness = checkColorBrightnessProps(color);

  function copyColor() {
    navigator.clipboard.writeText(color);
  }

  const LockedIconState = isLocked
    ? (props: IconProps) => <Lock {...props} />
    : (props: IconProps) => <LockOpen {...props} />;

  return (
    <div
      className='w-full h-16 flex flex-col justify-center items-center md:justify-center md:items-end md:flex-row md:h-80 group'
      style={{ backgroundColor: color }}
    >
      <div className='flex flex-row items-center justify-center space-x-10 sm:group-hover:flex md:flex-col md:space-x-0 md:space-y-10 md:mb-10 lg:hidden'>
        <ArrowClockwise
          className={clsx('select-none cursor-pointer text-lg sm:text-xl', {
            'text-white': !checkColorBrightness,
            'text-black': checkColorBrightness,
          })}
          weight='bold'
          aria-describedby='generated-new-color'
          onClick={() => updateColor(index)}
        />

        <Copy
          className={clsx('select-none cursor-pointer text-lg sm:text-xl', {
            'text-white': !checkColorBrightness,
            'text-black': checkColorBrightness,
          })}
          weight='bold'
          onClick={copyColor}
        />

        <div>
          <LockedIconState
            className={clsx('select-none cursor-pointer text-lg sm:text-xl', {
              'text-white': !checkColorBrightness,
              'text-black': checkColorBrightness,
            })}
            weight='bold'
            onClick={() => lockUnlockColor(index)}
          />
        </div>
      </div>
    </div>
  );
}

export default memo(GeneratedColor);
