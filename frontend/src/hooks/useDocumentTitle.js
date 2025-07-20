import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useDocumentTitle = () => {
  const location = useLocation();

  useEffect(() => {
    // Handle both HashRouter and BrowserRouter cases
    const getPath = () => {
      // If using HashRouter, location.pathname will be '/' and the actual path is in location.hash
      if (location.pathname === '/' && location.hash) {
        return location.hash.replace('#', '') || '/';
      }
      // For BrowserRouter, use location.pathname directly
      return location.pathname;
    };

    const currentPath = getPath();

    const pathToTitle = {
      '/': 'ALC - Home',
      '/login': 'ALC - Login',
      '/signup': 'ALC - Sign Up',
      '/otp': 'ALC - OTP Verification',
      '/bl': 'ALC - Blog',
      '/member': 'ALC - Members',
      '/contact': 'ALC - Contact',
      '/au': 'ALC - About Us',
      '/h': 'ALC - Dashboard',
      '/memberh': 'ALC - Members Dashboard',
      '/blog': 'ALC - Blog Dashboard',
      '/contacth': 'ALC - Contact Dashboard',
      '/auh': 'ALC - About Dashboard',
    };

    document.title = pathToTitle[currentPath] || 'ALC-Website';
    
  }, [location.pathname, location.hash]); // Watch both pathname and hash
};

export default useDocumentTitle;