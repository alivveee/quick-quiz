import CountdownTimer from "@/features/quiz/components/CountdownTimer";
import { imageMap } from "@/lib";
import { useState } from "react";
import "react-circular-progressbar/dist/styles.css";
import { MdCheckCircle } from "react-icons/md";
import CircularProgress from "../components/CircularProgress";
import { Button } from "@/components/ui/button";

const questions = [
  {
    id: 1,
    question: "Apa ibu kota Indonesia?",
    options: ["Jakarta", "Bandung", "Surabaya", "Medan"],
    correct: 0,
    type: "multiple",
  },
  {
    id: 2,
    question: "Apa simbol kimia untuk air?",
    options: ["H2O", "CO2", "NaCl", "O2"],
    correct: 0,
    type: "multiple",
  },
  {
    id: 3,
    question: "Thomas Edison menemukan lampu pijar",
    options: ["Benar", "Salah"],
    correct: 0,
    type: "boolean",
  },
  {
    id: 4,
    question: "Apa planet terdekat dengan matahari?",
    options: ["Merkurius", "Venus", "Bumi", "Mars"],
    correct: 0,
    type: "multiple",
  },
  {
    id: 5,
    question: "George Washington adalah presiden pertama Amerika Serikat",
    options: ["Benar", "Salah"],
    correct: 0,
    type: "boolean",
  },
  {
    id: 6,
    question: "Apa nama ilmiah untuk manusia?",
    options: [
      "Homo sapiens",
      "Homo erectus",
      "Homo neanderthalensis",
      "Homo sapiens neanderthalensis",
    ],
    correct: 0,
    type: "multiple",
  },
  {
    id: 7,
    question: "Siapa penulis novel 'Harry Potter'?",
    options: [
      "J.K. Rowling",
      "Stephen King",
      "Suzanne Collins",
      "George R.R. Martin",
    ],
    correct: 0,
    type: "multiple",
  },
  {
    id: 8,
    question: "Benua terbesar di dunia adalah Asia",
    options: ["Benar", "Salah"],
    correct: 0,
    type: "boolean",
  },
  {
    id: 9,
    question: "Berapa jumlah warna pada pelangi?",
    options: ["5", "6", "7", "8"],
    correct: 2,
    type: "multiple",
  },
  {
    id: 10,
    question: "Gunung Everest terletak di India",
    options: ["Benar", "Salah"],
    correct: 1,
    type: "boolean",
  },
  {
    id: 11,
    question: "Apa satuan ukuran arus listrik?",
    options: ["Ampere", "Volt", "Ohm", "Watt"],
    correct: 0,
    type: "multiple",
  },
  {
    id: 12,
    question: "Elang bisa terbang",
    options: ["Benar", "Salah"],
    correct: 0,
    type: "boolean",
  },
  {
    id: 13,
    question: "Siapa presiden ke-7 Indonesia?",
    options: ["Joko Widodo", "Susilo Bambang Yudhoyono", "Megawati", "Habibie"],
    correct: 0,
    type: "multiple",
  },
  {
    id: 14,
    question: "Berapa sisi yang dimiliki segitiga?",
    options: ["2", "3", "4", "5"],
    correct: 1,
    type: "multiple",
  },
  {
    id: 15,
    question: "Bumi mengelilingi matahari dalam waktu 365 hari",
    options: ["Benar", "Salah"],
    correct: 0,
    type: "boolean",
  },
];

const QuizPage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);

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

    if (answerIndex === currentQuestion.correct) {
      setScore((prev) => prev + 1);
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
    // refresh the page
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div>
        <div className="flex justify-between items-center w-full px-4 py-3">
          {/* Kiri: Info Quiz */}
          <div className="flex gap-3 items-center min-w-0 flex-1">
            <div className="size-13 bg-primary rounded-lg p-3.5">
              <img
                src={imageMap[1]}
                alt="quickquizlogo"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-center gap-0.5 min-w-0">
              <h1 className="text-lg md:text-xl font-bold truncate">
                General Knowledge
              </h1>
              <p className="text-xs md:text-sm text-gray-500 truncate">
                Multiple choice & true/false
              </p>
            </div>
          </div>

          {/* Kanan: Timer dan nomor soal */}
          {!isFinished ? (
            <div className="flex items-center gap-3 md:gap-4 flex-shrink-0 ml-4">
              <CountdownTimer
                key={currentQuestionIndex}
                initialSeconds={20}
                onFinish={goToNextQuestion}
              />
              <div className="px-2.5 py-1.5 bg-primary text-white rounded-md text-xs md:text-sm font-semibold">
                {currentQuestionIndex + 1}/{questions.length}
              </div>
            </div>
          ) : (
           <Button>Browse All Quizzes</Button>
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
          ) : (
            <div className="flex flex-col items-center gap-4">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                Congratulations!
              </h2>
              <CircularProgress score={score} totalScore={questions.length} />
              <div className="flex gap-6">
                <Button onClick={handleRestart}>Play Again</Button>
                <Button variant="outline">See My Result</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
