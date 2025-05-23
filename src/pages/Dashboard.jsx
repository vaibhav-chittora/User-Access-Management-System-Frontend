import { useAuth } from "../context/authContext";
import { Link } from "react-router-dom";

export default function Dashboard() {
    const { user } = useAuth();

    if (!user) return <p className="text-center mt-10">Loading...</p>;

    const { role, username } = user;

    const links = {
        Admin: [{ path: "/create-software", label: "Create Software" }],
        Employee: [{ path: "/request-access", label: "Request Software Access" }],
        Manager: [{ path: "/pending-requests", label: "Approve/Reject Requests" }],
    };

    return (
        <div className="min-h-screen p-10 bg-gray-100">
            <h1 className="text-3xl font-bold mb-4 text-center">
                Welcome, {username} ({role})
            </h1>
            <div className="flex flex-col items-center gap-4 mt-8">
                {(links[role] || []).map((link) => (
                    <Link
                        key={link.path}
                        to={link.path}
                        className="bg-blue-500 hover:bg-blue-700 text-white px-6 py-2 rounded text-lg"
                    >
                        {link.label}
                    </Link>
                ))}
            </div>
        </div>
    );
}
