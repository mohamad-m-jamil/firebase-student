import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Spinner from "../components/Spinner";

function ProtectedRoute({ children, role }) {
  const { currentUser, userRole, loading } = useAuth();

  if (loading) return <Spinner />;
  if (!currentUser) return <Navigate to="/login" />;
  if (role && userRole !== role) return <Navigate to="/login" />;

  return children;
}

export default ProtectedRoute;