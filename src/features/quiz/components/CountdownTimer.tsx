import { useEffect, useState } from "react";
import { MdTimer } from "react-icons/md";

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
    if (totalSeconds < 60) {
      return `${totalSeconds}s`;
    }
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${String(seconds).padStart(2, "0")}`;
  };

  // warna timer
  const getTimerColor = () => {
    if (secondsLeft <= 5) return "text-red-500";
    if (secondsLeft <= 10) return "text-orange-500";
    return "text-gray-700";
  };

  return (
    <div
      className={`flex items-center gap-1.5 text-lg font-mono font-semibold ${getTimerColor()}`}
    >
      <MdTimer className="size-5" />
      <span>{formatTime(secondsLeft)}</span>
    </div>
  );
};

export default CountdownTimer;
