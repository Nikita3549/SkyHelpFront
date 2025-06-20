import { Outlet, Route, Routes, useLocation } from 'react-router-dom';
import AffiliateDashboard from '@/pages/AffiliateDashboard.tsx';
import ClaimForm from '@/pages/ClaimForm.tsx';
import Dashboard from '@/pages/Dashboard.tsx';
import Admin from '@/pages/Admin.tsx';
import UserManagement from '@/pages/UserManagement.tsx';
import Contact from '@/pages/Contact.tsx';
import AboutUs from '@/pages/AboutUs.tsx';
import AffiliateProgram from '@/pages/AffiliateProgram.tsx';
import AffiliateRegister from '@/pages/AffiliateRegister.tsx';
import AffiliateLogin from '@/pages/AffiliateLogin.tsx';
import LegalPartnership from '@/pages/LegalPartnership.tsx';
import B2bPartnership from '@/pages/B2bPartnership.tsx';
import PrivacyPolicy from '@/pages/PrivacyPolicy.tsx';
import TermsOfService from '@/pages/TermsOfService.tsx';
import AirPassengerRights from '@/pages/rights/AirPassengerRights.tsx';
import DelayedFlightCompensation from '@/pages/rights/DelayedFlightCompensation.tsx';
import OverbookedFlightCompensation from '@/pages/rights/OverbookedFlightCompensation.tsx';
import CancelledFlightCompensation from '@/pages/rights/CancelledFlightCompensation.tsx';
import DeniedBoardingCompensation from '@/pages/rights/DeniedBoardingCompensation.tsx';
import MissedConnectionCompensation from '@/pages/rights/MissedConnectionCompensation.tsx';
import AirlineStrikeCompensation from '@/pages/rights/AirlineStrikeCompensation.tsx';
import DelayedBaggageCompensation from '@/pages/rights/DelayedBaggageCompensation.tsx';
import FlightCompensation from '@/pages/rights/FlightCompensation.tsx';
import ShyRegulationTurkey from '@/pages/rights/ShyRegulationTurkey.tsx';
import Anac400Regulation from '@/pages/rights/Anac400Regulation.tsx';
import Uk261FlightCompensation from '@/pages/rights/Uk261FlightCompensation.tsx';
import NotFound from '@/pages/NotFound.tsx';
import Index from '@/pages/Index';
import Header from '@/components/layout/Header.tsx';
import Footer from '@/components/layout/Footer.tsx';
import { ProtectedRoute } from './ProtectedRoute';
import { UserRole } from '@/contexts/AuthContext.tsx';
import Login from '@/pages/Login.tsx';
import Register from '@/pages/Register.tsx';
import { Forgot } from '@/pages/Forgot.tsx';
import { useEffect, useState } from 'react';
// import ThankYouPage from '@/pages/ThankYou.tsx';

const Layout = () => {
  const location = useLocation();
  const isAffiliateDashboard = location.pathname === '/affiliate/dashboard';
  const [adjustPadding, setAdjustPadding] = useState(false);

  function isTelegramWebView() {
    return /Telegram/i.test(navigator.userAgent);
  }

  useEffect(() => {
    if (isTelegramWebView()) {
      setAdjustPadding(true);
    }
  }, []);

  return (
    <>
      {!isAffiliateDashboard && <Header />}
      <main
        className={`flex-grow ${
          !isAffiliateDashboard ? (adjustPadding ? 'pt-[100px]' : 'pt-16') : ''
        }`}
      >
        <Outlet />
      </main>
      {!isAffiliateDashboard && <Footer />}
    </>
  );
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Маршруты вне Layout */}
      <Route path="/affiliate/dashboard" element={<AffiliateDashboard />} />
      {/*<Route path="/thankyou" element={<ThankYouPage />} />*/}

      {/* Маршруты с общим Layout */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/claim" element={<ClaimForm />} />
        <Route
          path="dashboard"
          element={
            <ProtectedRoute requiredRole={[UserRole.CLIENT]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        {/*<Route*/}
        {/*  path="admin"*/}
        {/*  element={*/}
        {/*    <ProtectedRoute requiredRole={[UserRole.ADMIN, UserRole.MODERATOR]}>*/}
        {/*      <Admin />*/}
        {/*    </ProtectedRoute>*/}
        {/*  }*/}
        {/*/>*/}
        <Route path="admin" element={<Admin />}></Route>
        <Route
          path="admin/users"
          element={
            <ProtectedRoute requiredRole={[UserRole.ADMIN, UserRole.MODERATOR]}>
              <UserManagement />
            </ProtectedRoute>
          }
        />
        <Route path="contact" element={<Contact />} />
        <Route path="about" element={<AboutUs />} />
        <Route path="affiliate" element={<AffiliateProgram />} />
        <Route path="affiliate/register" element={<AffiliateRegister />} />
        <Route path="affiliate/login" element={<AffiliateLogin />} />
        <Route path="legal-partnership" element={<LegalPartnership />} />
        <Route path="b2b-partnership" element={<B2bPartnership />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="terms" element={<TermsOfService />} />

        {/* Rights Pages */}
        <Route
          path="rights/air-passenger-rights"
          element={<AirPassengerRights />}
        />
        <Route
          path="rights/delayed-flight-compensation"
          element={<DelayedFlightCompensation />}
        />
        <Route
          path="rights/overbooked-flight-compensation"
          element={<OverbookedFlightCompensation />}
        />
        <Route
          path="rights/cancelled-flight-compensation"
          element={<CancelledFlightCompensation />}
        />
        <Route
          path="rights/denied-boarding-compensation"
          element={<DeniedBoardingCompensation />}
        />
        <Route
          path="rights/missed-connection-compensation"
          element={<MissedConnectionCompensation />}
        />
        <Route
          path="rights/airline-strike-compensation"
          element={<AirlineStrikeCompensation />}
        />
        <Route
          path="rights/delayed-baggage-compensation"
          element={<DelayedBaggageCompensation />}
        />
        <Route
          path="rights/flight-compensation"
          element={<FlightCompensation />}
        />
        <Route
          path="rights/shy-regulation-turkey"
          element={<ShyRegulationTurkey />}
        />
        <Route
          path="rights/anac-400-regulation"
          element={<Anac400Regulation />}
        />
        <Route
          path="rights/uk-261-flight-compensation"
          element={<Uk261FlightCompensation />}
        />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
