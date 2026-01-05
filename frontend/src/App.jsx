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
import Resources from "./pages/Res";
import Resources_ from "./pages/Res_";

// --- 1. FIXED Auth Protection (Solves the deployment issue) ---
const RequireAuth = ({ children }) => {
  const { patronId } = useParams(); // URL param (Always a String)
  const storedUser = localStorage.getItem('currentUser');
  
  // 1. Check if user is logged in
  if (!storedUser) {
    return <Navigate to="/login" replace />;
  }

  const user = JSON.parse(storedUser);
  const currentUserId = user.alc_patronid || user.membershipId || "user";

  // 2. Compare IDs (Normalize both to String to prevent type errors)
  // If the URL has an ID, and it doesn't match the storage ID, block access.
  if (patronId && String(patronId).trim() !== String(currentUserId).trim()) {
    // Redirect to 404 if they try to access someone else's route
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

  // --- 2. Session Timeout Logic (1 Minute Inactivity) ---
  useEffect(() => {
    // Only set timeout if a user is logged in
    const user = localStorage.getItem('currentUser');
    if (!user) return;

    // 1 Minute in milliseconds (Change to 15 * 60 * 1000 for 15 mins)
    const TIMEOUT_DURATION = 60 * 1000; 
    let timeoutId;

    const handleLogout = () => {
      // Clear data
      localStorage.removeItem('currentUser');
      // Show alert
      toast.error("Session expired due to inactivity.");
      // Redirect to login
      navigate('/login');
    };

    const resetTimer = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(handleLogout, TIMEOUT_DURATION);
    };

    // Events to track activity
    const events = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart'];
    
    // Attach listeners
    events.forEach(event => {
      document.addEventListener(event, resetTimer);
    });

    // Start initial timer
    resetTimer();

    // Cleanup listeners on unmount or path change
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      events.forEach(event => {
        document.removeEventListener(event, resetTimer);
      });
    };
  }, [navigate, location.pathname]); // Re-run when path changes to keep timer alive

  // Loading Screen Logic
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
          @keyframes slow-blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0.3; }
          }
          .animate-slow-blink {
            animation: slow-blink 0.8s ease-in-out infinite;
          }
        `}</style>
      </div>
    );
  }

  return (
    <>
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/admin' element={<AdminLoginPage />} />
          <Route path='/signup' element={<SignUpPage />} />
          <Route path="/otp" element={<OtpVerify />} />
          <Route path='/bl' element={ <Blog />} />
          <Route path='/member' element={<MembersPage />} />
          <Route path='/contact' element={<ContactPage />} />
          <Route path='/au' element={ <AboutPage />} />
          <Route path='/events' element={ <EventsPage />} />   
          <Route path='/res' element={ <Resources />} />
          
          {/* Admin routes */}
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
          
          {/* User routes - Protected & ID Verified */}
          <Route path='/:patronId/h' element={
            <RequireAuth>
              <HomePage_ />
            </RequireAuth>
          } />
          
          <Route path='/:patronId/memberh' element={
            <RequireAuth>
              <MembersPage_ />
            </RequireAuth>
          } />
          
          <Route path='/:patronId/blog' element={
            <RequireAuth>
              <Blogspot />
            </RequireAuth>
          } />
          
          <Route path='/:patronId/contacth' element={
            <RequireAuth>
              <ContactPage_ />
            </RequireAuth>
          } />
          
          <Route path='/:patronId/auh' element={
            <RequireAuth>
              <AboutPage_ />
            </RequireAuth>
          } />

          <Route path='/:patronId/eventsh' element={
            <RequireAuth>
              <EventsPage_ />
            </RequireAuth>
          } />

          <Route path='/:patronId/event1' element={
            <RequireAuth>
              <Event1 />
            </RequireAuth>
          } />

          <Route path='/:patronId/event2' element={
            <RequireAuth>
              <Event2 />
            </RequireAuth>
          } />

           <Route path='/:patronId/resh' element={
            <RequireAuth>
              <Resources_ />
            </RequireAuth>
          } />
          
          {/* Catch-all route for any undefined path */}
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
        <Footer/>
        <Toaster />
      </AuthProvider>
    </>
  );
}

export default App;