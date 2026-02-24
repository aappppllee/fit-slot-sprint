
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Search, Building, User, LogOut, LayoutDashboard } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

const Navbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);
  const [isGymOwner, setIsGymOwner] = useState(false);

  useEffect(() => {
    if (user) {
      supabase.from("profiles").select("*").eq("id", user.id).single().then(({ data }) => {
        if (data) setProfile(data);
      });
      supabase.from("user_roles").select("role").eq("user_id", user.id).eq("role", "gym_owner").single().then(({ data }) => {
        setIsGymOwner(!!data);
      });
    } else {
      setProfile(null);
      setIsGymOwner(false);
    }
  }, [user]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const initials = profile?.full_name
    ? profile.full_name.split(" ").map((n: string) => n[0]).join("").toUpperCase()
    : "U";

  return (
    <nav className="w-full bg-background border-b border-border py-3 px-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 bg-primary rounded-md flex items-center justify-center">
            <span className="font-bold text-primary-foreground text-xl">F</span>
          </div>
          <span className="font-bold text-xl">FitSlot</span>
        </Link>

        <div className="hidden md:flex space-x-1">
          <Link to="/"><Button variant="ghost" className="flex items-center gap-1"><Home className="h-4 w-4" /><span>Home</span></Button></Link>
          <Link to="/find-gym"><Button variant="ghost" className="flex items-center gap-1"><Search className="h-4 w-4" /><span>Find Gyms</span></Button></Link>
          {(isGymOwner || !user) && (
            <Link to="/register-gym"><Button variant="ghost" className="flex items-center gap-1"><Building className="h-4 w-4" /><span>Register Gym</span></Button></Link>
          )}
          {user && (
            <Link to="/dashboard"><Button variant="ghost" className="flex items-center gap-1"><LayoutDashboard className="h-4 w-4" /><span>Dashboard</span></Button></Link>
          )}
        </div>

        <div className="flex items-center space-x-3">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full p-0">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={profile?.avatar_url || undefined} />
                    <AvatarFallback className="bg-primary text-primary-foreground text-sm">{initials}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  <User className="h-4 w-4 mr-2" /> Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                  <LayoutDashboard className="h-4 w-4 mr-2" /> Dashboard
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link to="/gym-user-auth"><Button variant="outline">Login</Button></Link>
              <Link to="/book"><Button className="gradient-button">Book Now</Button></Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
