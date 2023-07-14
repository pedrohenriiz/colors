type HeroWelcomeProps = {
  generateColors: () => void;
};

export function HeroWelcome({ generateColors }: HeroWelcomeProps) {
  return (
    <div className="flex flex-col font-body lg:mr-4">
      <h1 className="font-bold text-2xl text-center mt-4 md:text-3xl md:mt-0 lg:text-6xl lg:text-left lg:max-w-2xl">
        Generate color palettes <span className="text-blue">quickly!</span>
      </h1>

      <p className="text-center text-gray-500 mt-4 md:mt-6 lg:text-left lg:text-lg">
        Generate random palettes, customize it on your own and save it to use
        later!
      </p>

      <button
        className="hidden border-solid border-2 w-fit font-sans border-black bg-blue font-bold text-white px-3 py-2 rounded-[4px] mt-6 text-xl lg:block"
        style={{ boxShadow: "2px 2px 0px 0px #000000" }}
        onClick={generateColors}
      >
        Generate
      </button>
    </div>
  );
}
