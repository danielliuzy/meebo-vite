import { useState } from "react";
import { StatusRow } from "./StatusRow";

const sleepMax = 8;
const exerciseMax = 10000;

const App = () => {
  const [animated, setAnimated] = useState(false);

  const [sleep] = useState(4.53);
  const [food] = useState(0.1);
  const [exercise] = useState(3432);

  const overallScore =
    (Math.min(1, sleep / sleepMax) +
      food +
      Math.min(1, exercise / exerciseMax)) /
    3;

  return (
    <div className="bg-gray-400 w-screen h-screen flex flex-col items-center px-6">
      {/* Top navigation bar */}
      <nav className="flex items-center justify-between p-4 bg-blue-400 shadow rounded-b-lg">
        <div className="text-lg font-bold">Meebo</div>
      </nav>

      {/* Tamagotchi card */}
      <div className="w-full m-4 bg-blue-400 p-6 rounded-lg shadow-lg">
        <div className="flex flex-col items-center">
          <div className="rounded-full p-2 relative">
            <div className="w-fit absolute left-1/2 top-[20%] -translate-x-1/2 -translate-y-1/2  text-center">
              <div
                className={`${
                  animated ? "animate-bounce" : ""
                } bg-white rounded-lg text-black text-2xl p-2 font-bold border-black border-2`}
              >
                Please eat more vegetables!
              </div>
            </div>
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
            <div className="text-sm font-light">Animated</div>
          </div>
        </div>
      </div>
      <div className="w-full m-4 bg-blue-400 p-6 rounded-lg shadow-lg">
        <div className="w-full space-y-2">
          <StatusRow
            name="Sleep"
            score={sleep}
            max={sleepMax}
            unit={`HOUR${sleep !== 1 ? "S" : ""}`}
          />
          <StatusRow name="Food" score={food} widget="FILE" />
          <StatusRow
            name="Exercise"
            score={exercise}
            max={exerciseMax}
            unit={`STEP${exercise !== 1 ? "S" : ""}`}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
