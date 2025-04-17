
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CalendarDays, Home, User } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="w-full bg-white border-b border-gray-200 py-3 px-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 bg-gym-purple rounded-md flex items-center justify-center">
            <span className="font-bold text-white text-xl">F</span>
          </div>
          <span className="font-bold text-xl">FitSlot</span>
        </Link>
        <div className="hidden md:flex space-x-1">
          <Link to="/">
            <Button variant="ghost" className="flex items-center gap-1">
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Button>
          </Link>
          <Link to="/book">
            <Button variant="ghost" className="flex items-center gap-1">
              <CalendarDays className="h-4 w-4" />
              <span>Book Slot</span>
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button variant="ghost" className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>Dashboard</span>
            </Button>
          </Link>
        </div>
        <div className="flex items-center space-x-3">
          <Link to="/book">
            <Button className="gradient-button">Book Now</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
