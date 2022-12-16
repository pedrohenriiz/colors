import { clsx } from 'clsx';
import { LockOpen, ArrowClockwise, Copy } from 'phosphor-react';

import { checkColorBrightnessProps } from '../../utils/checkColorBrightness';

interface GeneratedColorProps {
  color: string;
}

export function GeneratedColor({ color }: GeneratedColorProps) {
  const checkColorBrightness = checkColorBrightnessProps(color);

  return (
    <div
      className='w-full h-16 flex flex-col justify-center items-center md:justify-center md:items-end md:flex-row md:h-80 group'
      style={{ backgroundColor: color }}
    >
      <div className='flex flex-row items-center justify-center space-x-10 sm:group-hover:flex md:flex-col md:space-x-0 md:space-y-10 md:mb-10 lg:hidden'>
        <ArrowClockwise
          className={clsx('cursor-pointer text-lg sm:text-xl', {
            'text-white': !checkColorBrightness,
            'text-black': checkColorBrightness,
          })}
          weight='bold'
          aria-describedby='generated-new-color'
        />

        <Copy
          className={clsx('cursor-pointer text-lg sm:text-xl', {
            'text-white': !checkColorBrightness,
            'text-black': checkColorBrightness,
          })}
          weight='bold'
        />
        <LockOpen
          className={clsx('cursor-pointer text-lg sm:text-xl', {
            'text-white': !checkColorBrightness,
            'text-black': checkColorBrightness,
          })}
          weight='bold'
        />
      </div>
    </div>
  );
}
