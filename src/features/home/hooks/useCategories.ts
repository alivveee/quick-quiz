import axiosInstance from "@/lib/axios";
import { useEffect, useState } from "react";

type TriviaCategory = {
  id: number;
  name: string;
};

export const useCategories = () => {
  const [data, setData] = useState<TriviaCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axiosInstance
      .get(`/api_category.php?`)
      .then((res) => {
        if (res.data.trivia_categories) {
          setData(res.data.trivia_categories);
          setError(null);
        } else {
          setError("No categories available");
          setData([]);
        }
      })
      .catch((err: unknown) => {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Failed to fetch categories");
        }
        setData([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
};
