
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Feed from "./pages/Feed";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Chat from "./pages/Chat";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import QuizPage from "./pages/QuizPage";
import MLPage from "./pages/MLpage";
// import QuizPageUiUx from "./pages/QuizPageUiUx.tsx/Ux";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/feed" element={<Feed />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:projectId" element={<ProjectDetail />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/quiz" element={<QuizPage />} />
              <Route path="/ml" element={<MLPage />} />
              {/* <Route path="/quiz-uiux" element={<QuizPageUiUx />} /> */}
              {/* <Route path='/connect-github' element={<ConnectAccounts />} /> */}
              {/* <Route path='/connect-linkedin' element={<ConnectAccounts />} /> */}
              {/* <Route path='/connect-google' element={<ConnectAccounts />} /> */}
              {/* <Route path='/connect-facebook' element={<ConnectAccounts />} /> */}
              {/* <Route path='/connect-twitter' element={<ConnectAccounts />} /> */}
              {/* <Route path='/connect-coursera' element={<ConnectAccounts />} /> */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
