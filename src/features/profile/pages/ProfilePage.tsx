import { Button } from "@/components/ui/button";
import {
  FaUserCircle,
  FaTrophy,
  FaCalendarAlt,
  FaBrain,
  FaChartLine,
} from "react-icons/fa";
import { useState } from "react";
import { useSessionStore } from "@/store/useSessionStore";

const historyData = [
  {
    date: "27 Mei 2025",
    category: "General Knowledge",
    type: "Multiple Choice",
    questions: "10 Questions",
    correct: "8 True",
    score: "800 Points",
    accuracy: 80,
  },
  {
    date: "20 Mei 2025",
    category: "Technology",
    type: "Multiple Choice",
    questions: "10 Questions",
    correct: "9 True",
    score: "900 Points",
    accuracy: 90,
  },
  {
    date: "15 Mei 2025",
    category: "Science",
    type: "Multiple Choice",
    questions: "10 Questions",
    correct: "7 True",
    score: "700 Points",
    accuracy: 70,
  },
  {
    date: "10 Mei 2025",
    category: "History",
    type: "Multiple Choice",
    questions: "10 Questions",
    correct: "6 True",
    score: "600 Points",
    accuracy: 60,
  },
];

const ProfilePage = () => {
  const { session } = useSessionStore();
  const [activeTab, setActiveTab] = useState("History");

  const totalQuestions = historyData.length * 10;
  const totalCorrect = historyData.reduce(
    (sum, item) => sum + parseInt(item.correct.split(" ")[0]),
    0
  );
  const averageScore = Math.round(
    historyData.reduce(
      (sum, item) => sum + parseInt(item.score.split(" ")[0]),
      0
    ) / historyData.length
  );

  return (
    <div className="flex-1 flex flex-col gap-6 p-4 md:p-6">
      {/* Profile Header */}
      <div className="rounded-lg md:rounded-xl bg-white shadow-lg">
        <div className="p-4 md:p-6 lg:p-8">
          <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6">
            <div className="relative flex-shrink-0">
              <FaUserCircle
                size={60}
                className="text-primary sm:w-20 sm:h-20"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 sm:w-6 sm:h-6 bg-green-500 rounded-full border-2 border-white" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-xl md:text-2xl font-bold mb-1">
                {session?.user.user_metadata.full_name}
              </h1>
              <p className="text-sm md:text-base text-muted-foreground mb-3 md:mb-4">
                {session?.user.email}
              </p>

              {/* Quick Stats */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 text-xs md:text-sm">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <FaTrophy className="text-yellow-500 flex-shrink-0" />
                  <span className="text-muted-foreground">
                    {averageScore} avg score
                  </span>
                </div>
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <FaChartLine className="text-green-500 flex-shrink-0" />
                  <span className="text-muted-foreground">
                    {Math.round((totalCorrect / totalQuestions) * 100)}%
                    accuracy
                  </span>
                </div>
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <FaBrain className="text-primary flex-shrink-0" />
                  <span className="text-muted-foreground">
                    {historyData.length} quizzes
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*Tab */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
        <Button
          onClick={() => setActiveTab("History")}
          className={`rounded-xl px-4 md:px-6 py-2 md:py-3 font-semibold transition-all w-full sm:w-auto ${
            activeTab === "History"
              ? "shadow-lg shadow-primary/25"
              : "bg-white  text-muted-foreground hover:bg-muted border"
          }`}
          variant={activeTab === "History" ? "default" : "outline"}
        >
          <FaCalendarAlt className="mr-2" size={14} />
          History
        </Button>
        <Button
          variant="outline"
          className="rounded-xl px-4 md:px-6 py-2 md:py-3 font-semibold bg-white border text-muted-foreground cursor-not-allowed w-full sm:w-auto"
          disabled
        >
          Settings
        </Button>
      </div>

      {/* History Cards */}
      <div className="space-y-3 md:space-y-4">
        {historyData.map((item, index) => (
          <div
            key={index}
            className="group rounded-xl border p-4 md:p-6 bg-white hover:border-primary hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-3 md:mb-4 gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-white font-bold text-sm md:text-lg flex-shrink-0">
                  {item.category[0]}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-base md:text-lg truncate">
                    {item.category}
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground flex items-center gap-1">
                    <FaCalendarAlt
                      size={10}
                      className="md:w-3 md:h-3 flex-shrink-0"
                    />
                    <span className="truncate">{item.date}</span>
                  </p>
                </div>
              </div>

              <div className="text-center sm:text-right flex-shrink-0">
                <div className="text-xl md:text-2xl font-bold text-primary mb-1">
                  {item.score.split(" ")[0]}
                </div>
                <div className="text-xs text-muted-foreground">points</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs md:text-sm text-muted-foreground mb-3 gap-1">
              <span className="truncate">
                {item.type} • {item.questions}
              </span>
              <span className="font-medium">{item.correct}</span>
            </div>

            {/* Accuracy Bar */}
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-gradient-to-r from-primary to-primary/80 h-2 rounded-full transition-all duration-500 group-hover:from-primary group-hover:to-primary/60"
                style={{ width: `${item.accuracy}%` }}
              />
            </div>
            <div className="text-right mt-1">
              <span className="text-xs font-medium text-muted-foreground">
                {item.accuracy}% accuracy
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;
