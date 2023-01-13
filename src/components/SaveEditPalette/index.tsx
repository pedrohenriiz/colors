import { ColorProps } from '../../App';
import GeneratedColor from '../GeneratedColor';

interface SaveEditPaletteProps {
  generateColors: () => void;
  savePalette: () => void;
  isEditting: boolean;
}

export function SaveEditPalette({
  generateColors,
  savePalette,
  isEditting,
}: SaveEditPaletteProps) {
  return (
    <div className='mt-14 flex flex-col space-x-0 space-y-8 sm:mt-11 sm:flex-row sm:space-y-0 sm:space-x-32 lg:space-x-0 lg:items-center'>
      <button
        className='generatePaletteButtons border-black bg-blue text-white lg:hidden'
        style={{ boxShadow: '2px 2px 0px 0px #000000' }}
        onClick={generateColors}
      >
        Generate
      </button>

      <button
        className='generatePaletteButtons border-blue bg-white text-blue font-bold '
        style={{ boxShadow: '2px 2px 0px 0px #6CA1D1' }}
        onClick={() => savePalette()}
      >
        {isEditting ? <span>Edit palette</span> : <span>Save Palette</span>}
      </button>
    </div>
  );
}
