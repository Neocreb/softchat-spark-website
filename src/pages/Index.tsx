
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Home from './Home';

const Index = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // If we're on the exact /index route, redirect to home
    if (location.pathname.toLowerCase() === '/index') {
      navigate('/', { replace: true });
    }
  }, [navigate, location.pathname]);

  // Return the Home component directly
  return <Home />;
};

export default Index;
