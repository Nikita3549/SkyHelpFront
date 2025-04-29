
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./components/common/ScrollToTop";
import Index from "./pages/Index";
import ClaimForm from "./pages/ClaimForm";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import Contact from "./pages/Contact";
import AboutUs from "./pages/AboutUs";
import AffiliateProgram from "./pages/AffiliateProgram";
import AffiliateRegister from "./pages/AffiliateRegister";
import AffiliateLogin from "./pages/AffiliateLogin";
import AffiliateDashboard from "./pages/AffiliateDashboard";
import LegalPartnership from "./pages/LegalPartnership";
import B2bPartnership from "./pages/B2bPartnership";
import NotFound from "./pages/NotFound";

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

// Layout component to conditionally render header
const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isAffiliateDashboard = location.pathname === "/affiliate/dashboard";

  return (
    <>
      {!isAffiliateDashboard && <Header />}
      <main className={`flex-grow ${isAffiliateDashboard ? "" : "pt-16"}`}>
        {children}
      </main>
      {!isAffiliateDashboard && <Footer />}
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <BrowserRouter>
        <TooltipProvider>
          <ScrollToTop />
          <Toaster />
          <Sonner />
          <div className="flex flex-col min-h-screen">
            <Routes>
              <Route path="/affiliate/dashboard" element={<AffiliateDashboard />} />
              <Route
                path="*"
                element={
                  <Layout>
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/claim" element={<ClaimForm />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/admin" element={<Admin />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/about" element={<AboutUs />} />
                      <Route path="/affiliate" element={<AffiliateProgram />} />
                      <Route path="/affiliate/register" element={<AffiliateRegister />} />
                      <Route path="/affiliate/login" element={<AffiliateLogin />} />
                      <Route path="/legal-partnership" element={<LegalPartnership />} />
                      <Route path="/b2b-partnership" element={<B2bPartnership />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Layout>
                }
              />
            </Routes>
          </div>
        </TooltipProvider>
      </BrowserRouter>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
