interface NextButtonProps {
  onclick: () => void;
  surfboard: string;
  alt: string;
}

export default function NextButton({
  onclick,
  surfboard,
  alt,
}: NextButtonProps) {
  return (
    <button
      onClick={onclick}
      className="flex mx-auto transform duration-200 hover:scale-105 hover:rotate-2 active:scale-95 active:-rotate-5"
    >
        <img src={surfboard} alt={alt} />
    </button>
  );
}
