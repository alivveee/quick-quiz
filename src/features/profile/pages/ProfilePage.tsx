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
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router";
import HistoryCard from "../components/HistoryCard";
import { useHistoryStorage } from "@/hooks/useHistoryStorage";

const ProfilePage = () => {
  const { session } = useSessionStore();
  const [activeTab, setActiveTab] = useState("History");
  const navigate = useNavigate();
  const { getHistory } = useHistoryStorage();
  const historyData = getHistory();

  const totalQuestions = historyData.reduce(
    (sum, item) => sum + item.questions,
    0
  );
  const totalCorrect = historyData.reduce((sum, item) => sum + item.correct, 0);
  const averageScore = Math.round(
    historyData.reduce((sum, item) => sum + item.score, 0) / historyData.length
  );

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <div className="flex-1 flex flex-col gap-6 p-4 md:p-6">
      {/* Profile Header */}
      <div className="rounded-lg md:rounded-xl bg-white shadow-lg">
        <div className="relative p-4 md:p-6 lg:p-8">
          <Button
            onClick={handleLogout}
            className="absolute top-4 right-4 text-sm"
            variant="outline"
            size="sm"
          >
            Logout
          </Button>
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
        {historyData.length === 0 && (
          <p className="text-sm md:text-base text-muted-foreground text-center">
            No history found
          </p>
        )}
        {historyData.map((item, index) => (
          <HistoryCard key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;
