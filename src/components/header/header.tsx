import { Link, useNavigate } from "react-router";
import { Button } from "../ui/button";
import { useSessionStore } from "@/store/useSessionStore";
import { FaUserCircle } from "react-icons/fa";

const Header = () => {
  const { session } = useSessionStore();
  const navigate = useNavigate();

  return (
    <header className="bg-primary text-white h-22 flex items-center justify-between p-6">
      <Link to="/" className="flex justify-between items-center">
        <img src="/quickquiz.svg" alt="quickquizlogo" className="h-12" />
      </Link>
      {session ? (
        <div className="flex gap-3 items-center">
          <Link to="/profile" className="">
            <FaUserCircle size={42} className="text-white" />
          </Link>
        </div>
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
