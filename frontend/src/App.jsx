import { Route, Routes, Navigate, useNavigate, useLocation, useParams } from "react-router-dom";
import HomePage from "./pages/HomePage";
import HomePage_ from "./pages/HomePage_";
import LoginPage from "./pages/LoginPage";
import AdminLoginPage from "./admin/AdminLoginPage";
import Adcontrol from "./admin/AdminControlPage"; 
import SignUpPage from "./pages/SignUpPage";
import NotFoundPage from "./pages/404";
import { Toaster, toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import Blogspot from "./pages/Blogspot";
import Blog from "./pages/Blog";
import MembersPage from "./pages/MembersPage";
import MembersPage_ from "./pages/MembersPage_";
import ContactPage from "./pages/ContactPage";
import ContactPage_ from "./pages/ContactPage_";
import Footer from "./components/Footer";
import AboutPage from "./pages/AboutPage";
import AboutPage_ from "./pages/AboutPage_";
import { AuthProvider } from "./store/AuthContext";
import OtpVerify from "./pages/OtpVerify";
import CreateBlog from "./admin/CreateBlog";
import useDocumentTitle from './hooks/useDocumentTitle';
import EventsPage from "./pages/Events";
import EventsPage_ from "./pages/Events_";
import Event1 from "./pages/Event1";
import Event2 from "./pages/Event2";
{/*import Resources from "./pages/Res";
import Resources_ from "./pages/Res_";*/}

// --- Helper: Scroll To Top ---
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// --- NEW: Logout Wrapper for Public Routes ---
// This ensures that if a logged-in user visits a public page, their session is killed immediately.
const LogoutWrapper = ({ children }) => {
  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      localStorage.removeItem('currentUser');
      // Optional: You can uncomment the line below if you want to notify them
      // toast.success("You have been logged out.");
    }
  }, []);
  
  return children;
};

// --- Auth Protection Component ---
const RequireAuth = ({ children }) => {
  const { patronId } = useParams(); 
  const storedUser = localStorage.getItem('currentUser');
  
  if (!storedUser) {
    return <Navigate to="/login" replace />;
  }

  let user;
  try {
    user = JSON.parse(storedUser);
  } catch (error) {
    localStorage.removeItem('currentUser');
    return <Navigate to="/login" replace />;
  }

  const currentUserId = user.alc_patronid || user.membershipId || "user";

  // String comparison to handle Type Mismatch (Number vs String)
  if (patronId && String(patronId).trim() !== String(currentUserId).trim()) {
    return <Navigate to="/404" replace />;
  }

  return children;
};

// Admin auth protection component
const RequireAdminAuth = ({ children }) => {
  const user1 = localStorage.getItem('adminUser');
  if (!user1) {
    return <Navigate to="/admin" replace />;
  }
  return children;
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  useDocumentTitle();

  // --- 1. Handle "Before Hash" 404 Errors (Deployment Fix) ---
  useEffect(() => {
    const path = window.location.pathname;
    if (path !== '/' && path !== '/index.html') {
      window.location.replace(window.location.origin + '/#/404');
    }
  }, []);

  // --- 2. Session Timeout Logic (1 Minute Inactivity) ---
  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (!user) return;

    const TIMEOUT_DURATION = 60 * 1000; 
    let timeoutId;

    const handleLogout = () => {
      localStorage.removeItem('currentUser');
      toast.error("Session expired due to inactivity.");
      navigate('/login');
    };

    const resetTimer = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(handleLogout, TIMEOUT_DURATION);
    };

    // Optimization: Listen to fewer events to save performance
    const events = ['mousedown', 'keydown', 'scroll', 'touchstart'];
    events.forEach(event => document.addEventListener(event, resetTimer));
    resetTimer();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      events.forEach(event => document.removeEventListener(event, resetTimer));
    };
  }, [navigate, location.pathname]);

  // Loading Screen
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className='h-screen'>
        <div className='flex flex-col justify-center items-center bg-white h-full'>
          <img 
            src="/alc_logo.png" 
            alt="Loading..." 
            className="w-50 h-50 mb-4 animate-slow-blink"
          />
          <p className="text-white text-lg font-medium">Loading...</p>
        </div>
        <style jsx>{`
          @keyframes slow-blink { 0%, 50% { opacity: 1; } 51%, 100% { opacity: 0.3; } }
          .animate-slow-blink { animation: slow-blink 0.8s ease-in-out infinite; }
        `}</style>
      </div>
    );
  }

  return (
    <>
      <AuthProvider>
        <ScrollToTop />
        <Routes>
          {/* Public routes - NOW WRAPPED IN LogoutWrapper */}
          <Route path='/' element={<LogoutWrapper><HomePage /></LogoutWrapper>} />
          <Route path='/login' element={<LogoutWrapper><LoginPage /></LogoutWrapper>} />
          <Route path='/signup' element={<LogoutWrapper><SignUpPage /></LogoutWrapper>} />
          <Route path="/otp" element={<LogoutWrapper><OtpVerify /></LogoutWrapper>} />
          <Route path='/bl' element={<LogoutWrapper><Blog /></LogoutWrapper>} />
          <Route path='/member' element={<LogoutWrapper><MembersPage /></LogoutWrapper>} />
          <Route path='/contact' element={<LogoutWrapper><ContactPage /></LogoutWrapper>} />
          <Route path='/au' element={<LogoutWrapper><AboutPage /></LogoutWrapper>} />
          <Route path='/events' element={<LogoutWrapper><EventsPage /></LogoutWrapper>} />   
          {/*<Route path='/res' element={<LogoutWrapper><Resources /></LogoutWrapper>} />
          
          {/* Admin routes (Admin Login also clears regular user session) */}
          <Route path='/admin' element={<LogoutWrapper><AdminLoginPage /></LogoutWrapper>} />
          
          {/* Admin Protected Routes */}
          <Route path='/acp' element={
            <RequireAdminAuth>
              <Adcontrol />
            </RequireAdminAuth>
          } />
          
          <Route path='/cb' element={
            <RequireAdminAuth>
              <CreateBlog />
            </RequireAdminAuth>
          } />
          
          {/* User Protected Routes */}
          <Route path='/:patronId/h' element={<RequireAuth><HomePage_ /></RequireAuth>} />
          <Route path='/:patronId/memberh' element={<RequireAuth><MembersPage_ /></RequireAuth>} />
          <Route path='/:patronId/blog' element={<RequireAuth><Blogspot /></RequireAuth>} />
          <Route path='/:patronId/contacth' element={<RequireAuth><ContactPage_ /></RequireAuth>} />
          <Route path='/:patronId/auh' element={<RequireAuth><AboutPage_ /></RequireAuth>} />
          <Route path='/:patronId/eventsh' element={<RequireAuth><EventsPage_ /></RequireAuth>} />
          <Route path='/:patronId/event1' element={<RequireAuth><Event1 /></RequireAuth>} />
          <Route path='/:patronId/event2' element={<RequireAuth><Event2 /></RequireAuth>} />
          {/*<Route path='/:patronId/resh' element={<RequireAuth><Resources_ /></RequireAuth>} />
          
          {/* Catch-all route */}
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
        <Footer/>
        <Toaster />
      </AuthProvider>
    </>
  );
}

export default App;