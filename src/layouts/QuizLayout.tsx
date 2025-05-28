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
    <main className="flex flex-col min-h-screen px-22 py-8 bg-primary/15">
      <Outlet />
    </main>
  );
};

export default QuizLayout;
