import CountdownTimer from "@/features/quiz/components/CountdownTimer";
import { useHistoryStorage } from "@/hooks/useHistoryStorage";
import { categoryIconMap } from "@/lib";
import { useEffect, useMemo, useState } from "react";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate, useSearchParams } from "react-router";
import QuestionSection from "../components/QuestionSection";
import ResultCard from "../components/ResultCard";
import { useQuizQuestions } from "../hooks/useQuizQuestions";

const QuizPage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answered, setAnswered] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [correct, setCorrect] = useState(0);
  const { addHistory } = useHistoryStorage();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const { amount, category, type, title } = useMemo(() => {
    return {
      amount: searchParams.get("amount")!,
      category: searchParams.get("category")!,
      type: searchParams.get("type")!,
      title: searchParams.get("title")!,
    };
  }, [searchParams]);

  const IconComponent =
    categoryIconMap[Number(category) as keyof typeof categoryIconMap];

  const { data: questions, loading } = useQuizQuestions({
    amount,
    category,
    type,
  });

  useEffect(() => {
    if (isFinished) {
      const totalQuestions = questions.length;
      const accuracy = Math.round((correct / totalQuestions) * 100);
      const score = Math.floor((correct / totalQuestions) * 1000);

      addHistory({
        category,
        title,
        type,
        questions: totalQuestions,
        correct: correct,
        score: score,
        accuracy,
      });
    }
  }, [isFinished]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-6 text-center px-4 py-8">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-gray-800">
            Getting your questions ready...
          </h2>
          <p className="text-gray-600 text-sm">This won't take long! ⏳</p>
        </div>
      </div>
    );
  }
  const currentQuestion = questions[currentQuestionIndex];

  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
    }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (isAnswered) return;

    setSelectedAnswer(answerIndex);
    setIsAnswered(true);
    setAnswered((prev) => prev + 1);

    if (answerIndex === currentQuestion.correct) {
      setCorrect((prev) => prev + 1);
    }

    // Delay ke pertanyaan berikutnya
    setTimeout(() => {
      goToNextQuestion();
    }, 2000);
  };

  const getOptionClass = (index: number) => {
    if (!isAnswered) {
      return "border-gray-200 hover:border-primary hover:bg-primary/5 cursor-pointer";
    }

    if (index === currentQuestion.correct) {
      return "border-green-500 bg-green-50 text-green-700";
    }

    if (index === selectedAnswer && index !== currentQuestion.correct) {
      return "border-red-500 bg-red-50 text-red-700";
    }

    return "border-gray-200";
  };

  const handleRestart = () => {
    navigate(0);
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div>
        <div className="flex flex-col gap-2 md:flex-row justify-between items-center w-full px-4 py-3">
          {/* Kiri: Info Quiz */}
          <div className="flex gap-3 items-center min-w-0 flex-1 self-start md:self-auto">
            <div className="flex items-center justify-center size-10 md:size-12 bg-primary rounded-lg p-3.5">
              {IconComponent && (
                <IconComponent className="text-white size-4 md:size-5 group-hover:scale-110 transition-all duration-300" />
              )}
            </div>
            <div className="flex flex-col justify-center gap-0.5 min-w-0">
              <h1 className="text-md md:text-xl font-bold truncate">{title}</h1>
              <p className="text-xs md:text-sm text-gray-500 truncate">
                {type === "any"
                  ? "Multiple Choice or True/False"
                  : type === "multiple"
                  ? "Multiple Choice"
                  : "True or False"}
              </p>
            </div>
          </div>

          {/* Kanan: Timer dan nomor soal */}
          {!isFinished && (
            <div className="flex items-center gap-3 md:gap-4 flex-shrink-0 ml-4">
              <CountdownTimer
                key={currentQuestionIndex}
                initialSeconds={20}
                onFinish={goToNextQuestion}
                isPaused={isAnswered}
              />
              <div className="px-2.5 py-1.5 bg-primary text-white rounded-md text-xs md:text-sm font-semibold">
                {currentQuestionIndex + 1}/{questions.length}
              </div>
            </div>
          )}
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-200 h-1">
          <div
            className="h-full bg-primary transition-all duration-300 ease-out"
            style={{
              width: `${
                ((currentQuestionIndex + 1) / questions.length) * 100
              }%`,
            }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-3xl">
          {!isFinished ? (
            <QuestionSection
              currentQuestion={currentQuestion}
              isAnswered={isAnswered}
              handleAnswerSelect={handleAnswerSelect}
              getOptionClass={getOptionClass}
            />
          ) : (
            <ResultCard
              correct={correct}
              answered={answered}
              totalQuestion={questions.length}
              onRestart={handleRestart}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
