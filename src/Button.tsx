type Props = {
  text: string;
  onClick?: () => void;
};

export const Button = ({ text, onClick }: Props) => {
  return (
    <button
      className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg"
      onClick={onClick}
    >
      {text}
    </button>
  );
};
