import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute = () => {
  const token = localStorage.getItem('authToken');
  const isValidToken = token && token !== 'undefined' && token !== 'null' && token.trim() !== '';
  
  return isValidToken ? <Navigate to="/feed" replace /> : <Outlet />;
};

export default PublicRoute;
