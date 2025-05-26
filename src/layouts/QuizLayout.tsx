import { Outlet } from "react-router";

const QuizLayout = () => {
  return (
    <main className="flex flex-col min-h-screen px-22 py-8 bg-primary/15">
      <Outlet />
    </main>
  );
};

export default QuizLayout;
