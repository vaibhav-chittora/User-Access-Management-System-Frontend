import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

export default function LogoutBtn() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <button
            onClick={handleLogout}
            className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded"
        >
            Logout
        </button>
    );
}
