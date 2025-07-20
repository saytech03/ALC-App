import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useDocumentTitle = () => {
  const location = useLocation();

  useEffect(() => {
    // Always use window.location.hash for consistency
    const currentPath = window.location.hash 
      ? window.location.hash.replace('#', '') || '/' 
      : location.pathname;

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

    document.title = pathToTitle[currentPath] || 'ALC-App';
  }, [location.pathname, location.hash]); // Track both to ensure updates
};

export default useDocumentTitle;