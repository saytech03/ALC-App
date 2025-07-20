import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useDocumentTitle = () => {
  const location = useLocation();

  useEffect(() => {
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

    const defaultTitle = 'ALC - Loading...';
    document.title = pathToTitle[location.pathname] || defaultTitle;
  }, [location.pathname]);
};

export default useDocumentTitle;