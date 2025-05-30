import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import CircularProgress from "./CircularProgress";
import ResultItem from "./ResultItem";

type Props = {
  correct: number;
  answered: number;
  totalQuestion: number;
  onRestart: () => void;
};

const ResultCard = ({ correct, answered, totalQuestion, onRestart }: Props) => {
  const navigate = useNavigate();
  const incorrect = answered - correct;
  const unanswered = totalQuestion - answered;
  const accuracy = answered === 0 ? 0 : Math.round((correct / answered) * 100);

  return (
    <div className="flex flex-col items-center gap-3 mt-2">
      <div className="flex flex-col justify-center items-center gap-6 border rounded-xl p-6 bg-white text-sm text-muted-foreground shadow">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          Congratulations!
        </h2>
        <div className="flex flex-col md:flex-row gap-6 items-center">
          {/* Circular Progress */}
          <CircularProgress correct={correct} totalQuestion={totalQuestion} />

          <div className="flex flex-col gap-2 min-w-[180px]">
            <ResultItem label="Total Questions" value={totalQuestion} />
            <ResultItem label="Answered" value={answered} />
            <ResultItem
              label="Correct"
              value={correct}
              className="text-green-700"
            />
            <ResultItem
              label="Incorrect"
              value={incorrect}
              className="text-red-700"
            />
            <ResultItem label="Unanswered" value={unanswered} />
            <ResultItem label="Accuracy" value={`${accuracy}%`} />
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
