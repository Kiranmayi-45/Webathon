
import React, { useState } from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Home, 
  User, 
  MessageSquare, 
  Briefcase, 
  Clipboard, 
  LogOut, 
  Menu,
  X,
  Bell,
  Search,
  Sun,
  Moon,
  BrainCircuit, 
  Settings,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useTheme } from '@/contexts/ThemeContext';
import { Switch } from '@/components/ui/switch';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" />;
  }

  const isFreelancer = user.userType === 'freelancer';
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };
  
  const navigationItems = [
    {
      name: 'Feed',
      path: '/feed',
      icon: <Home className="h-5 w-5" />,
    },
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: <Clipboard className="h-5 w-5" />,
    },
    {
      name: 'Projects',
      path: '/projects',
      icon: <Briefcase className="h-5 w-5" />,
      label: isFreelancer ? 'Find Work' : 'Manage Projects'
    },
    {
      name: 'Messages',
      path: '/chat',
      icon: <MessageSquare className="h-5 w-5" />,
    },
    {
      name: 'Profile',
      path: '/profile',
      icon: <User className="h-5 w-5" />,
    },
    !isFreelancer ? 
    {
      name: 'Top Suggestions',
      path: '/ml',
      icon: <BrainCircuit className="h-5 w-5" />,
    } : null
  ].filter(Boolean);

  return (
    <div className={`flex h-screen ${theme === 'dark' ? 'dark' : ''}`}>
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="rounded-full shadow-md"
        >
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-background border-r border-border shadow-md transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center py-6 border-b border-border">
            <Link to="/dashboard" className="flex items-center space-x-2">
              <div className="bg-brand-purple w-8 h-8 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">PC</span>
              </div>
              <span className="text-xl font-bold text-foreground">ProConnect</span>
            </Link>
          </div>

          <div className="flex flex-col justify-between flex-1 px-4 py-6">
            <nav className="space-y-1">
              {navigationItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`flex items-center px-4 py-3 rounded-md transition-colors ${
                      isActive
                        ? 'bg-brand-purple text-white'
                        : 'text-foreground hover:bg-accent'
                    }`}
                    onClick={() => {
                      if (window.innerWidth < 1024) {
                        setSidebarOpen(false);
                      }
                    }}
                  >
                    <div className={`${isActive ? 'text-white' : 'text-muted-foreground'}`}>
                      {item.icon}
                    </div>
                    <span className="ml-3">{item.label || item.name}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="mt-auto space-y-4">
              <div className="flex items-center px-4 justify-between">
                <div className="flex items-center">
                  {theme === 'dark' ? (
                    <Moon className="h-4 w-4 mr-2 text-muted-foreground" />
                  ) : (
                    <Sun className="h-4 w-4 mr-2 text-muted-foreground" />
                  )}
                  <span className="text-sm text-foreground">Dark Mode</span>
                </div>
                <Switch
                  checked={theme === 'dark'}
                  onCheckedChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                />
              </div>
              
              <button
                onClick={logout}
                className="flex items-center px-4 py-3 text-foreground rounded-md hover:bg-accent w-full"
              >
                <LogOut className="h-5 w-5 text-muted-foreground" />
                <span className="ml-3">Logout</span>
              </button>

              <div className="flex items-center mt-4 px-4 py-3 bg-accent/50 rounded-md">
                <Avatar className="h-10 w-10 border">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                </Avatar>
                <div className="ml-3">
                  <p className="text-sm font-medium text-foreground">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.userType}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 overflow-auto lg:ml-64 bg-background">
        {/* Top bar */}
        <header className="bg-background border-b border-border py-4 px-6 flex items-center justify-between sticky top-0 z-10">
          <div className="flex-1 max-w-md mr-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="What are you looking for?"
                className="w-full pl-10 pr-4 py-2 rounded-full border border-input bg-background focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5 text-foreground" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full" />
            </Button>
            
            <div className="hidden md:flex items-center">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage src={user.avatar} />
                <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
              </Avatar>
              <span className="font-medium text-foreground">{user.name}</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="px-4 py-6 md:px-6 md:py-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
