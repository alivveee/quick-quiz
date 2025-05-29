import { useSessionStore } from "@/store/useSessionStore";
import { Navigate, Outlet } from "react-router";

const QuizLayout = () => {
  const { session, isLoading } = useSessionStore();

  if (isLoading) {
    return null;
  }
  if (!session) {
    return <Navigate to="/login" />;
  }
  return (
    <main className="flex flex-col min-h-screen px-4 md:px-22 py-4 md:py-8 bg-secondary/5">
      <Outlet />
    </main>
  );
};

export default QuizLayout;
