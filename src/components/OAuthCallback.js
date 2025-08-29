import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { setCredentials } from '../store/slices/authSlice';

const OAuthCallback = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleOAuthCallback = () => {
      const urlParams = new URLSearchParams(location.search);
      const token = urlParams.get('token');
      const user = urlParams.get('user');
      const error = urlParams.get('error');

      if (error) {
        console.error('OAuth error:', error);
        navigate('/login?error=' + encodeURIComponent(error));
        return;
      }

      if (token && user) {
        try {
          const userData = JSON.parse(decodeURIComponent(user));
          dispatch(setCredentials({ token, user: userData }));
          navigate('/todos');
        } catch (error) {
          console.error('Error parsing user data:', error);
          navigate('/login?error=Invalid user data');
        }
      } else {
        navigate('/login?error=Missing authentication data');
      }
    };

    handleOAuthCallback();
  }, [dispatch, navigate, location]);

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Обробка аутентифікації...</h2>
        <p>Будь ласка, зачекайте.</p>
        <div className="loading-spinner"></div>
      </div>
    </div>
  );
};

export default OAuthCallback;
