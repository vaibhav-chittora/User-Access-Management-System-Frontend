import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import toast from "react-hot-toast";

export default function PendingRequests() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchRequests = async () => {
        try {
            const res = await axiosInstance.get("/requests");
            setRequests(res.data.data);
        } catch (err) {
            toast.error("Failed to fetch requests");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const handleStatusChange = async (id, status) => {
        try {
            await axiosInstance.patch(`/requests/${id}`, { status });
            setRequests((prev) =>
                prev.map((req) => (req.id === id ? { ...req, status } : req))
            );
            toast.success(`Request ${status.toLowerCase()} successfully.`);
        } catch (err) {
            toast.error("Failed to update request status");
        }
    };

    if (loading) return <p className="text-center mt-10">Loading requests...</p>;

    return (
        <div className="p-6 max-w-5xl mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-4">Pending Access Requests</h2>

            {requests.length === 0 ? (
                <p>No requests found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white shadow rounded">
                        <thead>
                            <tr className="bg-gray-100 text-left text-sm">
                                <th className="p-2">Employee</th>
                                <th className="p-2">Software</th>
                                <th className="p-2">Access Type</th>
                                <th className="p-2">Reason</th>
                                <th className="p-2">Status</th>
                                <th className="p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map((req) => (
                                <tr key={req.id} className="border-t text-sm">
                                    <td className="p-2">{req.user.username}</td>
                                    <td className="p-2">{req.software.name}</td>
                                    <td className="p-2">{req.accessType}</td>
                                    <td className="p-2">{req.reason}</td>
                                    <td className="p-2 font-semibold">{req.status}</td>
                                    <td className="p-2 space-x-2">
                                        {req.status === "Pending" && (
                                            <>
                                                <button
                                                    className="bg-green-600 text-white px-2 py-1 rounded"
                                                    onClick={() => handleStatusChange(req.id, "Approved")}
                                                >
                                                    Approve
                                                </button>
                                                <button
                                                    className="bg-red-600 text-white px-2 py-1 rounded"
                                                    onClick={() => handleStatusChange(req.id, "Rejected")}
                                                >
                                                    Reject
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
