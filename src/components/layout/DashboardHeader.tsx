
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { ThemeToggle } from "@/components/ThemeToggle";
import { User, Settings, Shield } from "lucide-react";

const DashboardHeader = () => {
  const { user, logout, isAdmin } = useAuth();
  
  return (
    <header className="w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/dashboard" className="font-semibold text-xl">
          {user?.isChild ? "Educate Kids! 🚀" : "Educate"}
        </Link>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          {isAdmin() && (
            <Button variant="outline" size="sm" asChild>
              <Link to="/admin">
                <Shield className="mr-2 h-4 w-4" />
                Admin
              </Link>
            </Button>
          )}
          <Button variant="ghost" onClick={logout}>Logout</Button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
