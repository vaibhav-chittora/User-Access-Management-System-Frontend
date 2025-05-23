import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const { username, role, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    if (!isAuthenticated) {
        return <p className="text-center mt-10 text-red-600">Please login first.</p>;
    }

    const links = [
        {
            label: "Create Software",
            path: "/create-software",
            roles: ["Admin"],
        },
        {
            label: "Request Access",
            path: "/request-access",
            roles: ["Employee"],
        },
        {
            label: "Approve/Reject Requests",
            path: "/pending-requests",
            roles: ["Manager"],
        },
    ];

    return (
        <div className="min-h-screen flex flex-col items-center p-10">
            <h1 className="text-3xl font-bold mb-4">Welcome, {username}</h1>
            <p className="mb-8 text-gray-600">Role: {role}</p>

            <div className="flex flex-col gap-4 w-80">
                {links.map((link) =>
                    link.roles.includes(role) ? (
                        <button
                            key={link.path}
                            onClick={() => navigate(link.path)}
                            className="bg-blue-500 text-white py-2 rounded"
                        >
                            {link.label}
                        </button>
                    ) : (
                        <button
                            key={link.path}
                            className="bg-gray-300 text-gray-700 py-2 rounded cursor-not-allowed"
                            disabled
                        >
                            {link.label} (Unauthorized)
                        </button>
                    )
                )}
                <button
                    onClick={() => {
                        logout();
                        navigate("/login");
                    }}
                    className="bg-red-500 text-white py-2 px-4 rounded mt-4 cursor-pointer"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}
