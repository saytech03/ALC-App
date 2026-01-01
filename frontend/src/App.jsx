import { Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import HomePage_ from "./pages/HomePage_";
import LoginPage from "./pages/LoginPage";
import AdminLoginPage from "./admin/AdminLoginPage";
import Adcontrol from "./admin/AdminControlPage"; 
import SignUpPage from "./pages/SignUpPage";
import NotFoundPage from "./pages/404";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { Loader } from "lucide-react";
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

// Auth protection component (unchanged)
const RequireAuth = ({ children }) => {
  const user = localStorage.getItem('currentUser');
  if (!user) {
    // Redirect to login if no user found
    return <Navigate to="/login" replace />;
  }
  return children;
};

// Enhanced Admin auth protection component
const RequireAdminAuth = ({ children }) => {
  const user1 = localStorage.getItem('adminUser');
  if (!user1) {
    // Redirect to login if no user found
    return <Navigate to="/admin" replace />;
  }
  return children;
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  useDocumentTitle();
  

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

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
            0%, 50% {
              opacity: 1;
            }
            51%, 100% {
              opacity: 0.3;
            }
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
          
          {/* Admin routes - protected by admin authentication */}
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
          
          {/* User routes - protected by regular user authentication */}
          {/* UPDATED: Added /:patronId to the paths */}
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
          
          {/* Catch-all route */}
          <Route path='/*' element={<NotFoundPage />} />
        </Routes>
        <Footer/>
        <Toaster />
      </AuthProvider>
    </>
  );
}

export default App;