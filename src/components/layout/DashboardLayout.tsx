
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LogOut, 
  Menu, 
  X, 
  BookOpen, 
  Home, 
  Plus, 
  User, 
  Cog, 
  BookOpenCheck
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';

type DashboardLayoutProps = {
  children: React.ReactNode;
};

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, logout, isInstructor } = useAuth();
  const navigate = useNavigate();

  const sidebarItems = [
    { 
      name: 'Dashboard', 
      icon: Home, 
      path: '/dashboard',
      showFor: ['student', 'instructor', 'admin'],
    },
    { 
      name: 'My Courses', 
      icon: BookOpen, 
      path: '/my-courses',
      showFor: ['student', 'instructor', 'admin'],
    },
    { 
      name: 'Create Course', 
      icon: Plus, 
      path: '/create-course',
      showFor: ['instructor', 'admin'],
    },
    { 
      name: 'My Students', 
      icon: BookOpenCheck, 
      path: '/my-students',
      showFor: ['instructor', 'admin'],
    },
    { 
      name: 'Profile', 
      icon: User, 
      path: '/profile',
      showFor: ['student', 'instructor', 'admin'],
    },
    { 
      name: 'Settings', 
      icon: Cog, 
      path: '/settings',
      showFor: ['student', 'instructor', 'admin'],
    },
  ];
  
  // Filter menu items based on user role
  const filteredItems = sidebarItems.filter(item => {
    if (!user?.role) return false;
    return item.showFor.includes(user.role);
  });

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 transform bg-sidebar border-r border-sidebar-border transition-transform duration-300 ease-in-out lg:static lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Sidebar header */}
          <div className="flex h-16 items-center justify-between px-4 py-6">
            <div className="flex items-center">
              <span className="text-xl font-semibold">Educate</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden"
            >
              <X size={20} />
            </Button>
          </div>

          {/* Sidebar content */}
          <nav className="flex-1 overflow-auto pt-5 px-3">
            <div className="space-y-1">
              {filteredItems.map((item) => (
                <Button
                  key={item.name}
                  variant={
                    location.pathname === item.path ? "secondary" : "ghost"
                  }
                  className={cn(
                    "w-full justify-start text-left font-medium",
                    location.pathname === item.path
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                  )}
                  onClick={() => navigate(item.path)}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Button>
              ))}
            </div>
          </nav>

          {/* Sidebar footer */}
          <div className="border-t border-sidebar-border p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-primary text-xs flex items-center justify-center text-white">
                  {user?.name?.[0]?.toUpperCase() || "U"}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">{user?.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">
                    {user?.role || "User"}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={logout}
                className="text-sidebar-foreground hover:text-sidebar-foreground/80"
              >
                <LogOut size={18} />
              </Button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top navigation */}
        <header className="h-16 border-b border-border flex items-center px-4 lg:px-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(true)}
            className={cn("lg:hidden", sidebarOpen && "hidden")}
          >
            <Menu size={20} />
          </Button>
          <div className="ml-auto flex items-center gap-4">
            <div className="hidden lg:block">
              <span className="text-sm font-medium">
                Welcome, {user?.name || "User"}
              </span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <div className="mx-auto w-full max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
