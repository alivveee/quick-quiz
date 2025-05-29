import { useEffect, useState } from "react";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import confetti from "canvas-confetti";
import "react-circular-progressbar/dist/styles.css";

interface AnimatedCircularProgressProps {
  correct: number;
  totalQuestion: number;
  color?: string;
}

const CircularProgress = ({
  correct,
  totalQuestion,
  color = "#f5ba42",
}: AnimatedCircularProgressProps) => {
  const [hasFired, setHasFired] = useState(false);
  const points = Math.floor((correct / totalQuestion) * 1000);

  useEffect(() => {
    if (correct > 0 && !hasFired) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
      setHasFired(true);
    }
  }, [correct, hasFired]);

  return (
    <div className="size-48">
      <CircularProgressbarWithChildren
        value={correct}
        maxValue={totalQuestion}
        styles={buildStyles({
          pathColor: color,
          trailColor: "#eee",
        })}
      >
        <div className="flex flex-col justify-between h-13">
          <div className="px-1 py-2 mt-[-76px] bg-primary rounded-md flex items-center justify-center text-sm font-semibold text-white">
            <h1>Your Score</h1>
          </div>
          <div className="flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-gray-800">
              {correct}/{totalQuestion}
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
