import { useAuth } from "../store/AuthContext";
import NotFoundPage from "../pages/404";
import { useEffect, useState } from "react";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const [initialCheckDone, setInitialCheckDone] = useState(false);

  useEffect(() => {
    // Small delay to allow auth state to update
    const timer = setTimeout(() => {
      setInitialCheckDone(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Show loading while checking authentication
  if (loading || !initialCheckDone) {
    return (
      <div className='h-screen flex justify-center items-center bg-black'>
        <div className='text-white text-lg'>Loading...</div>
      </div>
    );
  }

  // If user is not authenticated, show 404 page
  if (!isAuthenticated) {
    return <NotFoundPage />;
  }

  // If user is authenticated, render the protected component
  return children;
};

export default ProtectedRoute;