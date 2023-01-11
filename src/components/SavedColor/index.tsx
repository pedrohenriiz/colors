import { ColorProps } from '../../App';

interface SavedColorProps {
  item: ColorProps[];
}

export function SavedColor({ item }: SavedColorProps) {
  return (
    <div className='w-80 h-80 flex flex-col justify-center items-center md:justify-center md:items-end group'>
      {item.map((itemColor) => {
        return (
          <div
            className='w-full h-full flex '
            style={{ backgroundColor: itemColor.color }}
            key={new Date().getTime() + itemColor.color}
          />
        );
      })}
    </div>
  );
}
