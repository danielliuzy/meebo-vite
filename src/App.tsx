import { useState } from "react";
import { StatusRow } from "./StatusRow";

const sleepMax = 8;
const exerciseMax = 10000;
const foodMax = 10;

const App = () => {
  const [sleep] = useState(5.2);
  const [food, setFood] = useState(8);
  const [exercise] = useState(7384);

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

  const overallScore =
    (Math.min(1, sleep / sleepMax) +
      Math.min(1, food / foodMax) +
      Math.min(1, exercise / exerciseMax)) /
    3;

  return (
    <div className="bg-gray-100 w-screen h-screen flex flex-col items-center px-6">
      {/* Top navigation bar */}
      <nav className="flex flex-row items-center justify-center w-full p-6 bg-gray-800 shadow rounded-b-lg">
        <div className="flex flex-row items-center space-x-2">
          <img src="/favicon.png" width={36} />
          <div className="text-lg font-bold w-full text-center">Shiboo</div>
        </div>
      </nav>

      {/* Tamagotchi card */}
      <div className="w-full m-4 bg-gray-800 p-6 rounded-lg shadow-lg">
        <div className="flex flex-col items-center">
          <div className="rounded-full p-2 relative w-full">
            {message !== "" && (
              <div className="w-fit absolute left-1/2 top-[20%] -translate-x-1/2 -translate-y-1/2  text-center">
                <div
                  className={
                    "animate-bounce bg-white rounded-lg text-black text-2xl p-2 font-bold border-black border-2"
                  }
                >
                  {`Eat ${message} for your next meal 🥗`}
                </div>
              </div>
            )}
            <img
              className="rounded-lg"
              src={`/${overallScore >= 0.7 ? "happy" : "sad"}-tamagotchi.gif`}
            />
          </div>
          <h1 className="text-2xl font-bold mt-2">My Shiba</h1>
        </div>
      </div>
      <div className="w-full m-4 bg-gray-800 p-6 rounded-lg shadow-lg">
        <div className="w-full space-y-2">
          <StatusRow
            name="Sleep 🛏️"
            score={sleep}
            max={sleepMax}
            unit={`HOUR${sleep !== 1 ? "S" : ""}`}
          />
          <StatusRow
            name="Food 🍔"
            score={food}
            widget="FILE"
            loading={loading}
            max={foodMax}
            setScore={setFood}
            setMessage={setMessage}
            setLoading={setLoading}
          />
          <StatusRow
            name="Exercise 🏃"
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
