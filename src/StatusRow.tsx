type Props = {
  name: string;
  score: number;
  max?: number;
  unit?: string;
  widget?: Widget;
};

type Widget = "FILE";

export const StatusRow = ({ name, score, max = 1, unit, widget }: Props) => {
  return (
    <div className="flex justify-between">
      <div className="flex flex-row items-center space-x-2">
        <div>
          {score / max > 0.66 ? "🟢" : score / max > 0.33 ? "🟡" : "🔴"}
        </div>
        <div className="text-lg font-semibold">{name}</div>
      </div>
      {widget == null ? (
        <div className="flex flex-row space-x-1 items-end">
          <div className="text-xl font-semibold">{score}</div>
          <div className="text-md">{unit}</div>
        </div>
      ) : (
        <label className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 hover:cursor-pointer">
          <input className="hidden" type="file" />
          📷
        </label>
      )}
    </div>
  );
};
