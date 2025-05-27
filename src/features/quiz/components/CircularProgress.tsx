import { useEffect, useState } from "react";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface AnimatedCircularProgressProps {
  score: number;
  totalScore: number;
  duration?: number;
  children?: React.ReactNode;
  color?: string;
}

const CircularProgress = ({
  score,
  totalScore,
  color = "#f5ba42",
}: AnimatedCircularProgressProps) => {
  const [value, setValue] = useState(0);

  const points = Math.floor((score / totalScore) * 1000);

  useEffect(() => {
    setValue(score);
  }, [score]);

  return (
    <div className="size-48">
      <CircularProgressbarWithChildren
        value={value}
        maxValue={totalScore}
        styles={buildStyles({
          pathColor: color,
          trailColor: "#eee",
        })}
      >
        <div className="flex flex-col justify-between h-13 ">
          <div className="px-1 py-2 mt-[-76px] bg-primary rounded-md flex items-center justify-center text-sm font-semibold text-white">
            <h1>Your score</h1>
          </div>
          <div className="flex flex-col items-center justify-center ">
            <span className="text-3xl font-bold text-gray-800">
              {score}/{totalScore}
            </span>
            <span className="text-sm text-gray-500 font-bold">
              {points} points
            </span>
          </div>
        </div>
      </CircularProgressbarWithChildren>
    </div>
  );
};

export default CircularProgress;
