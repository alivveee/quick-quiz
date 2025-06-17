import { Link, useNavigate } from "react-router";
import { Button } from "../ui/button";
import { useSessionStore } from "@/store/useSessionStore";
import { FaUserCircle } from "react-icons/fa";
import { Skeleton } from "../ui/skeleton";

const Header = () => {
  const { session, isLoading } = useSessionStore();
  const navigate = useNavigate();

  return (
    <header className="bg-primary text-white h-22 flex items-center justify-between py-6 px-6 md:px-20">
      <Link to="/" className="flex justify-between items-center">
        <img src="/quickquiz.svg" alt="quickquizlogo" className="h-11" />
      </Link>

      {isLoading ? (
        <div className="flex items-center">
          <Skeleton className="h-10 w-10 rounded-full bg-white/90" />
        </div>
      ) : session ? (
        <Link to="/profile" className="">
          <FaUserCircle size={42} className="text-white" />
        </Link>
      ) : (
        <Button
          onClick={() => {
            navigate("/login");
          }}
          className="bg-secondary text-white hover:bg-secondary/90"
        >
          Login
        </Button>
      )}
    </header>
  );
};

export default Header;
