import { Route, Routes, Navigate } from "react-router-dom";
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

// Auth protection component
const RequireAuth = ({ children }) => {
  const user = localStorage.getItem('currentUser');
  if (!user) {
    // Redirect to login if no user found
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

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
            0%, 50% {
              opacity: 1;
            }
            51%, 100% {
              opacity: 0.3;
            }
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
          <Route path='/bl' element={ <Blog />} />
          <Route path='/member' element={<MembersPage />} />
          <Route path='/contact' element={<ContactPage />} />
          <Route path='/au' element={ <AboutPage />} />
          <Route path='/h' element={
            <RequireAuth>
              <HomePage_ />
            </RequireAuth>
          } />
          
          <Route path='/memberh' element={
            <RequireAuth>
              <MembersPage_ />
            </RequireAuth>
          } />
          
          <Route path='/blog' element={
            <RequireAuth>
              <Blogspot />
            </RequireAuth>
          } />
          
          <Route path='/contacth' element={
            <RequireAuth>
              <ContactPage_ />
            </RequireAuth>
          } />
          
          <Route path='/auh' element={
            <RequireAuth>
              <AboutPage_ />
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