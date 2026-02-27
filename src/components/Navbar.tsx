
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, User, Building, Search, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Navbar = () => {
  const { user, isDemoUser } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    if (isDemoUser) {
      sessionStorage.removeItem("demo_user");
      toast({ title: "Logged out", description: "Demo session ended." });
      navigate("/");
      window.location.reload();
    } else {
      await supabase.auth.signOut();
      navigate("/");
    }
  };

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
              <Home className="h-4 w-4" /><span>Home</span>
            </Button>
          </Link>
          <Link to="/find-gym">
            <Button variant="ghost" className="flex items-center gap-1">
              <Search className="h-4 w-4" /><span>Find Gyms</span>
            </Button>
          </Link>
          <Link to="/register-gym">
            <Button variant="ghost" className="flex items-center gap-1">
              <Building className="h-4 w-4" /><span>Register Gym</span>
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button variant="ghost" className="flex items-center gap-1">
              <User className="h-4 w-4" /><span>Dashboard</span>
            </Button>
          </Link>
        </div>
        <div className="flex items-center space-x-3">
          {user ? (
            <>
              {isDemoUser && (
                <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full">Demo</span>
              )}
              <Button variant="outline" size="sm" onClick={handleLogout} className="flex items-center gap-1">
                <LogOut className="h-4 w-4" /> Logout
              </Button>
            </>
          ) : (
            <Link to="/gym-user-auth">
              <Button variant="outline">Login</Button>
            </Link>
          )}
          <Link to="/book">
            <Button className="gradient-button">Book Now</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
