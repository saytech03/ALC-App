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
      '/contact': 'ALC - Contact Us',
      '/au': 'ALC - About Us',
      '/h': 'ALC - Home',
      '/memberh': 'ALC - Members',
      '/blog': 'ALC - Blog',
      '/contacth': 'ALC - Contact Us',
      '/auh': 'ALC - About Us',
    };

    document.title = pathToTitle[currentPath] || 'ALC-App';
  }, [location.pathname, location.hash]); // Track both to ensure updates
};

export default useDocumentTitle;