import { Button } from "@/components/ui/button";
import { Link, Outlet } from "react-router";

const HomeLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-primary text-white h-22 flex items-center justify-between p-6">
        <Link to="/" className="flex justify-between items-center">
          <img src="/quickquiz.svg" alt="quickquizlogo" className="h-12" />
        </Link>
        <Button className="bg-secondary text-white hover:bg-secondary/90">
          Sign in
        </Button>
      </header>
      <main className="flex flex-col flex-1 px-22 py-8 bg-primary/15">
        <Outlet />
      </main>
      <footer className="bg-secondary text-white p-4 flex justify-center items-center">
        <p>&copy; 2025 Alif Ahmad</p>
      </footer>
    </div>
  );
};

export default HomeLayout;
