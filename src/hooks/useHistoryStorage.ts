import { useCallback } from "react";

export interface QuizHistoryItem {
  date: string;
  category: string;
  title: string;
  type: string;
  questions: number;
  correct: number;
  score: number;
  accuracy: number;
}

const HISTORY_KEY = "quizHistory";

export function useHistoryStorage() {
  const getHistory = useCallback((): QuizHistoryItem[] => {
    const data = localStorage.getItem(HISTORY_KEY);
    return data ? JSON.parse(data) : [];
  }, []);

  const addHistory = useCallback(
    (item: Omit<QuizHistoryItem, "date">) => {
      const date = new Date().toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });

      const newItem: QuizHistoryItem = {
        ...item,
        date,
      };

      const existing = getHistory();
      const updated = [newItem, ...existing];

      localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
    },
    [getHistory]
  );

  return {
    getHistory,
    addHistory,
  };
}
