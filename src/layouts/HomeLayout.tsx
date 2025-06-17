import Header from "@/components/header";
import { Outlet } from "react-router";

const HomeLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-col flex-1 px-6 md:px-20 py-4 md:py-8 bg-secondary/5">
        <Outlet />
      </main>
      <footer className="bg-secondary text-white p-4 flex justify-center items-center">
        <p>&copy; 2025 Alif Ahmad</p>
      </footer>
    </div>
  );
};

export default HomeLayout;
