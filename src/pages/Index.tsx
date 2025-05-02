
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Home from './Home';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // If we're on the exact /index route, redirect to home
    if (window.location.pathname.toLowerCase() === '/index') {
      navigate('/', { replace: true });
    }
  }, [navigate]);

  // Return the Home component directly
  return <Home />;
};

export default Index;
