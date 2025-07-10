import { Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import HomePage_ from "./pages/HomePage_";
import LoginPage from "./pages/LoginPage";
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
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const [fromLogin, setFromLogin] = useState(false);

  useEffect(() => {
    // Set a timer for 5 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    // Check if coming from login page
    if (location.state?.fromLogin) {
      setFromLogin(true);
      // Reset after navigation is complete
      const navTimer = setTimeout(() => setFromLogin(false), 100);
      return () => {
        clearTimeout(timer);
        clearTimeout(navTimer);
      };
    }

    return () => clearTimeout(timer);
  }, [location]);

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className='h-screen'>
        <div className='flex flex-col justify-center items-center bg-black h-full'>
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
            animation: slow-blink 1.1s ease-in-out infinite;
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
          <Route path='/signup' element={<SignUpPage />} />
          <Route path='/bl' element={<Blog />} />
          <Route path='/member' element={<MembersPage />} />
          <Route path='/contact' element={<ContactPage />} />
          <Route path='/au' element={<AboutPage />} />
          
          {/* Conditionally protected routes */}
          {fromLogin ? (
            <>
              <Route path='/h' element={<HomePage_ />} />
              <Route path='/memberh' element={<MembersPage_ />} />
              <Route path='/blog' element={<Blogspot />} />
              <Route path='/contacth' element={<ContactPage_ />} />
              <Route path='/auh' element={<AboutPage_ />} />
            </>
          ) : (
            <>
              <Route path='/h' element={
                <ProtectedRoute>
                  <HomePage_ />
                </ProtectedRoute>
              } />
              <Route path='/memberh' element={
                <ProtectedRoute>
                  <MembersPage_ />
                </ProtectedRoute>
              } />
              <Route path='/blog' element={
                <ProtectedRoute>
                  <Blogspot />
                </ProtectedRoute>
              } />
              <Route path='/contacth' element={
                <ProtectedRoute>
                  <ContactPage_ />
                </ProtectedRoute>
              } />
              <Route path='/auh' element={
                <ProtectedRoute>
                  <AboutPage_ />
                </ProtectedRoute>
              } />
            </>
          )}
          
          {/* 404 route */}
          <Route path='/*' element={<NotFoundPage />} />
        </Routes>
        <Footer />
        <Toaster />
      </AuthProvider>
    </>
  );
}

export default App;