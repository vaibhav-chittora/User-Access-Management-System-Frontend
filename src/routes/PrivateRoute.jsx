import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children, allowedRoles }) {
    const { user } = useAuth();

    if (!user) return <Navigate to="/login" />;

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return <Navigate to="/unauthorized" />;
    }

    return children;
}
