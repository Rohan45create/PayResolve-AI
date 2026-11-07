import { getCurrentUser } from '../lib/authStore';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const user = getCurrentUser();
  if (!user) {
    return <Navigate to="/signed-out" replace />;
  }
  return <>{children}</>;
};
