import { useEffect, useState } from "react";
import qs from "qs";
import axiosInstance from "@/lib/axios";
import { convertQuestions, type Question } from "@/lib";

type Params = {
  amount: string;
  category: string;
  type: string;
};

export const useQuizQuestions = ({ amount, category, type }: Params) => {
  const [data, setData] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("Fetching quiz questions");
    axiosInstance
      .get(
        `/api.php?${qs.stringify(
          { amount, category, ...(type !== "any" && { type }) },
          { skipNulls: true }
        )}`
      )
      .then((res) => {
        if (res.data?.response_code === 0 && Array.isArray(res.data.results)) {
          const formatedQuestions = convertQuestions(res.data.results);
          setData(formatedQuestions);
          setError(null);
        } else {
          setError("No questions available.");
          setData([]);
        }
      })
      .catch((err: unknown) => {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Failed to fetch quiz questions.");
        }
        setData([]);
      })
      .finally(() => setLoading(false));
  }, [amount, category, type]);

  return { data, loading, error };
};
