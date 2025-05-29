// components/ResultCard.tsx
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import CircularProgress from "./CircularProgress";

type Props = {
  correct: number;
  totalQuestion: number;
  onRestart: () => void;
};

const ResultCard = ({ correct, totalQuestion, onRestart }: Props) => {
  const navigate = useNavigate();
  const accuracy = Math.round((correct / totalQuestion) * 100);

  return (
    <div className="flex flex-col items-center gap-3 mt-2">
      <div className="flex flex-col justify-center items-center gap-6 border rounded-xl p-6 bg-white text-sm text-muted-foreground shadow">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          Congratulations!
        </h2>
        <div className="flex flex-col md:flex-row gap-6 items-center">
          {/* Circular Progress */}
          <CircularProgress correct={correct} totalQuestion={totalQuestion} />

          <div className="flex flex-col gap-2 min-w-[160px]">
            <div className="flex justify-between">
              <span className="font-medium text-gray-700">Questions</span>
              <span>{totalQuestion}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-700">Correct Answers</span>
              <span>{correct}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-700">Accuracy</span>
              <span>{accuracy}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-6">
        <Button onClick={onRestart}>Play Again</Button>
        <Button variant="outline" onClick={() => navigate("/profile")}>
          See My History
        </Button>
      </div>
      <Button onClick={() => navigate("/")}>Browse All Quizzes</Button>
    </div>
  );
};

export default ResultCard;
