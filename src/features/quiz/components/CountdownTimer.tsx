import { useEffect, useState, useRef } from "react";
import { MdTimer } from "react-icons/md";

interface CountdownTimerProps {
  initialSeconds: number;
  onFinish?: () => void;
  isPaused?: boolean;
}

const CountdownTimer = ({
  initialSeconds,
  onFinish,
  isPaused = false,
}: CountdownTimerProps) => {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setSecondsLeft(initialSeconds);
  }, [initialSeconds]);

  useEffect(() => {
    if (isPaused) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          onFinish?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPaused, onFinish]);

  const formatTime = (totalSeconds: number) => {
    if (totalSeconds < 60) {
      return `${totalSeconds}s`;
    }
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${String(seconds).padStart(2, "0")}`;
  };

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
