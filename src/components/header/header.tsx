import { Link } from "react-router";
import { Button } from "../ui/button";

const Header = () => {
  return (
    <header className="bg-primary text-white h-22 flex items-center justify-between p-6">
      <Link to="/" className="flex justify-between items-center">
        <img src="/quickquiz.svg" alt="quickquizlogo" className="h-12" />
      </Link>
      <Button className="bg-secondary text-white hover:bg-secondary/90">
        Sign in
      </Button>
    </header>
  );
};

export default Header;
