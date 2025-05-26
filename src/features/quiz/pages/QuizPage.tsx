import CountdownTimer from "@/features/quiz/components/CountdownTimer";
import { useState } from "react";

const questions = [
  { id: 1, question: "Apa ibu kota Indonesia?" },
  { id: 2, question: "Apa simbol kimia untuk air?" },
  // dst...
];

const QuizPage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      alert("Selesai!"); // Atau navigasi ke /quiz/finish
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex justify-between w-full">
        {/* Kiri: info quiz */}
        <div className="flex gap-2.5 p-1">{/* ...gambar & judul */}</div>

        {/* Kanan: timer */}
        <div className="p-4">
          <CountdownTimer
            key={currentQuestionIndex}
            initialSeconds={15}
            onFinish={goToNextQuestion}
          />
        </div>
      </div>

      <div className="mt-8 px-4">
        <h2 className="text-xl font-bold">
          Soal {currentQuestionIndex + 1}:{" "}
          {questions[currentQuestionIndex].question}
        </h2>
      </div>
    </div>
  );
};

export default QuizPage;
