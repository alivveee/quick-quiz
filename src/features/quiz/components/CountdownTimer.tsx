import { useEffect, useState } from "react";
import StopwatchIcon from "@/assets/stopwatch-icon.png"; // ikon hijau

interface CountdownTimerProps {
  initialSeconds: number;
  onFinish?: () => void;
}

const CountdownTimer = ({ initialSeconds, onFinish }: CountdownTimerProps) => {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);

  useEffect(() => {
    if (secondsLeft <= 0) {
      onFinish?.();
      return;
    }

    const timer = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsLeft, onFinish]);

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `00:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <div className="flex items-center gap-2 text-lg font-mono">
      <img src={StopwatchIcon} alt="timer" className="w-5 h-5" />
      <span>{formatTime(secondsLeft)}</span>
    </div>
  );
};

export default CountdownTimer;
