import { useState } from "react";
import { StatusRow } from "./StatusRow";

const App = () => {
  const [animated, setAnimated] = useState(false);

  const [sleep, setSleep] = useState(0.1);
  const [food, setFood] = useState(0.1);
  const [exercise, setExercise] = useState(0.1);

  const overallScore = (sleep + food + exercise) / 3;

  return (
    <div className="bg-gray-400 w-screen h-screen flex flex-col items-center px-6">
      {/* Top navigation bar */}
      <nav className="flex items-center justify-between p-4 bg-blue-400 shadow rounded-b-lg">
        <div className="text-lg font-bold">Meebo</div>
      </nav>

      {/* Tamagotchi card */}
      <div className="w-full m-4 bg-blue-400 p-6 rounded-lg shadow-lg">
        <div className="flex flex-col items-center">
          <div className="rounded-full p-2">
            <img
              className="rounded-lg"
              src={`/${overallScore >= 0.5 ? "happy" : "sad"}-tamagotchi.${
                animated ? "gif" : "png"
              }`}
            />
          </div>
          <h1 className="text-2xl font-bold mt-2">Tamagotchi</h1>
          <div className="items-center flex space-x-1">
            <input type="checkbox" onChange={() => setAnimated(!animated)} />{" "}
            <div className="text-sm font-light">Animate</div>
          </div>
        </div>
      </div>
      <div className="w-full m-4 bg-blue-400 p-6 rounded-lg shadow-lg">
        <div className="w-full space-y-2">
          <StatusRow
            name="Sleep"
            score={sleep}
            onClick={() => {
              setSleep(Math.min(1, sleep + 0.1));
            }}
          />
          <StatusRow name="Food" score={food} widget="FILE" />
          <StatusRow
            name="Exercise"
            score={exercise}
            onClick={() => {
              setExercise(Math.min(1, exercise + 0.1));
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
