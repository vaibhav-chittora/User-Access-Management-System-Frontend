import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("user"));
        if (stored) setUser(stored);
    }, []);

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <nav className="bg-gray-800 text-white px-4 py-3 flex justify-between">
            <div className="font-bold text-xl">
                <Link to="/">Access System</Link>
            </div>
            <div className="flex gap-4 items-center">
                {user?.role === "Admin" && (
                    <Link to="/create-software" className="hover:underline">
                        Create Software
                    </Link>
                )}
                {user?.role === "Employee" && (
                    <Link to="/request-access" className="hover:underline">
                        Request Access
                    </Link>
                )}
                {user?.role === "Manager" && (
                    <Link to="/pending-requests" className="hover:underline">
                        Pending Requests
                    </Link>
                )}
                {user ? (
                    <>
                        <span className="text-sm text-gray-300">{user.username}</span>
                        <button onClick={logout} className="text-red-400 text-sm">
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="hover:underline">
                            Login
                        </Link>
                        <Link to="/signup" className="hover:underline">
                            Sign Up
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
}
