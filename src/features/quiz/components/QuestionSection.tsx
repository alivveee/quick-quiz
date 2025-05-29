import type { Question } from "@/lib";
import { MdCheckCircle } from "react-icons/md";

type Props = {
  currentQuestion: Question;
  isAnswered: boolean;
  handleAnswerSelect: (index: number) => void;
  getOptionClass: (index: number) => string;
};

const QuestionSection = ({
  currentQuestion,
  isAnswered,
  handleAnswerSelect,
  getOptionClass,
}: Props) => {
  return (
    <>
      {/* Question */}
      <div className="p-6">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-500">
            {currentQuestion.type === "multiple"
              ? "Multiple Choice"
              : "True/False"}
          </span>
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-gray-800">
          {currentQuestion.question}
        </h2>
      </div>

      {/* Answer Options */}
      <div className="space-y-3">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerSelect(index)}
            disabled={isAnswered}
            className={`w-full p-3 border-2 rounded-md transition-all duration-200 ${getOptionClass(
              index
            )}`}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">{option}</span>
              {isAnswered && index === currentQuestion.correct && (
                <MdCheckCircle className="size-5 text-green-600" />
              )}
            </div>
          </button>
        ))}
      </div>
    </>
  );
};

export default QuestionSection;
