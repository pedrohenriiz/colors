interface GeneratedColorProps {
  color: string;
}

export function GeneratedColor({ color }: GeneratedColorProps) {
  return (
    <div
      className='w-full h-16 md:h-80'
      style={{ backgroundColor: color }}
    ></div>
  );
}
