import { Button } from "./Button";

type Props = {
  name: string;
  score: number;
  widget?: Widget;
  onClick?: () => void;
};

type Widget = "BUTTON" | "FILE";

export const StatusRow = ({
  name,
  score,
  widget = "BUTTON",
  onClick,
}: Props) => {
  return (
    <div className="flex justify-between">
      <div className="flex flex-row items-center space-x-2">
        <div>{score > 0.66 ? "🟢" : score > 0.33 ? "🟡" : "🔴"}</div>
        <div className="text-lg font-semibold">{name}</div>
      </div>
      {widget === "BUTTON" ? (
        <Button text="＋" onClick={onClick} />
      ) : (
        <label className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 hover:cursor-pointer">
          <input className="hidden" type="file" />
          📷
        </label>
      )}
    </div>
  );
};
