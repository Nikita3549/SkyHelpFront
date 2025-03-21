
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Index from "./pages/Index";
import ClaimForm from "./pages/ClaimForm";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ResetPassword from "./pages/auth/ResetPassword";
import UserDashboard from "./pages/UserDashboard";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AdminRoute from "./components/auth/AdminRoute";
import AuthRedirect from "./components/auth/AuthRedirect";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow pt-16">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route 
                  path="/claim" 
                  element={
                    <ProtectedRoute>
                      <ClaimForm />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/dashboard" 
                  element={
                    <ProtectedRoute>
                      <UserDashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin" 
                  element={
                    <AdminRoute>
                      <Admin />
                    </AdminRoute>
                  } 
                />
                <Route 
                  path="/login" 
                  element={
                    <AuthRedirect>
                      <Login />
                    </AuthRedirect>
                  } 
                />
                <Route 
                  path="/register" 
                  element={
                    <AuthRedirect>
                      <Register />
                    </AuthRedirect>
                  } 
                />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
