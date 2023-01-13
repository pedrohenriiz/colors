import { SavedColor } from '../SavedColor';

interface SavedPaletteProps {
  index: number;
  item: any;
  handleSetPaletteOnEditting: (item: any, index: number) => void;
  handleDeletePalette: (index: number) => void;
}

export function SavedPalette({
  index,
  item,
  handleSetPaletteOnEditting,
  handleDeletePalette,
}: SavedPaletteProps) {
  return (
    <div
      className='flex flex-row relative border-solid w-full border-4 border-black max-w-[290px] group items-center justify-center'
      style={{ boxShadow: '2px 4px 0px 0px #000000' }}
      key={new Date().getTime() + Math.random()}
    >
      <SavedColor key={index} item={item} />

      <div className='hidden absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 group-hover:flex group-hover:flex-col group-hover:space-y-4'>
        <button
          className='savedPaletteButtons bg-gray-200'
          style={{ boxShadow: '1px 1px 0px 0px #000000' }}
          onClick={() => handleSetPaletteOnEditting(item, index)}
        >
          Edit
        </button>
        <button
          className='savedPaletteButtons bg-red text-white'
          style={{ boxShadow: '1px 1px 0px 0px #000000' }}
          onClick={() => handleDeletePalette(index)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
