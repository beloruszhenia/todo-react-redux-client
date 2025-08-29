import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from './store/store';
import { verifyToken } from './store/slices/authSlice';

// Components
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import TodoList from './components/TodoList';
import OAuthCallback from './components/OAuthCallback';
import PrivateRoute from './components/PrivateRoute';

import './App.css';

const AppContent = () => {
  const dispatch = useDispatch();
  const { token, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token && !isAuthenticated) {
      dispatch(verifyToken());
    }
  }, [dispatch, token, isAuthenticated]);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route 
            path="/login" 
            element={
              isAuthenticated ? <Navigate to="/todos" replace /> : <Login />
            } 
          />
          <Route 
            path="/register" 
            element={
              isAuthenticated ? <Navigate to="/todos" replace /> : <Register />
            } 
          />
          <Route path="/auth/callback" element={<OAuthCallback />} />
          <Route 
            path="/todos" 
            element={
              <PrivateRoute>
                <TodoList />
              </PrivateRoute>
            } 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
