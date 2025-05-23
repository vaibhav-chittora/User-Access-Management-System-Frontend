import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { isAuthenticated, role } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(role)) {
        return <p className="text-center mt-10 text-red-600">❌ You are not authorized to access this page.</p>;
    }

    return children;
};

export default ProtectedRoute;
