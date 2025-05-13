
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

// Rights pages
import AirPassengerRights from "./pages/rights/AirPassengerRights";
import DelayedFlightCompensation from "./pages/rights/DelayedFlightCompensation";
import OverbookedFlightCompensation from "./pages/rights/OverbookedFlightCompensation";
import CancelledFlightCompensation from "./pages/rights/CancelledFlightCompensation";
import DeniedBoardingCompensation from "./pages/rights/DeniedBoardingCompensation";
import MissedConnectionCompensation from "./pages/rights/MissedConnectionCompensation";
import AirlineStrikeCompensation from "./pages/rights/AirlineStrikeCompensation";
import DelayedBaggageCompensation from "./pages/rights/DelayedBaggageCompensation";
import FlightCompensation from "./pages/rights/FlightCompensation";
import ShyRegulationTurkey from "./pages/rights/ShyRegulationTurkey";
import Anac400Regulation from "./pages/rights/Anac400Regulation";
import Uk261FlightCompensation from "./pages/rights/Uk261FlightCompensation";

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
                      
                      {/* Rights Pages */}
                      <Route path="/rights/air-passenger-rights" element={<AirPassengerRights />} />
                      <Route path="/rights/delayed-flight-compensation" element={<DelayedFlightCompensation />} />
                      <Route path="/rights/overbooked-flight-compensation" element={<OverbookedFlightCompensation />} />
                      <Route path="/rights/cancelled-flight-compensation" element={<CancelledFlightCompensation />} />
                      <Route path="/rights/denied-boarding-compensation" element={<DeniedBoardingCompensation />} />
                      <Route path="/rights/missed-connection-compensation" element={<MissedConnectionCompensation />} />
                      <Route path="/rights/airline-strike-compensation" element={<AirlineStrikeCompensation />} />
                      <Route path="/rights/delayed-baggage-compensation" element={<DelayedBaggageCompensation />} />
                      <Route path="/rights/flight-compensation" element={<FlightCompensation />} />
                      <Route path="/rights/shy-regulation-turkey" element={<ShyRegulationTurkey />} />
                      <Route path="/rights/anac-400-regulation" element={<Anac400Regulation />} />
                      <Route path="/rights/uk-261-flight-compensation" element={<Uk261FlightCompensation />} />
                      
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
