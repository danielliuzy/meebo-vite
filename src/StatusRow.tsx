import { Button } from "./Button";

type Props = {
  name: string;
  status: Status;
  widget?: Widget;
  onClick?: () => void;
};

type Status = "GOOD" | "MID" | "BAD";
type Widget = "BUTTON" | "FILE";

export const StatusRow = ({
  name,
  status,
  widget = "BUTTON",
  onClick,
}: Props) => {
  return (
    <div className="flex justify-between">
      <div className="flex flex-row items-center space-x-2">
        <div className="text-lg font-semibold">{name}</div>
        <div>{status === "GOOD" ? "🟢" : status === "MID" ? "🟡" : "🔴"}</div>
      </div>
      {widget === "BUTTON" ? (
        <Button text="＋" onClick={onClick} />
      ) : (
        <label className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg">
          <input className="hidden" type="file" />
          📷
        </label>
      )}
    </div>
  );
};
