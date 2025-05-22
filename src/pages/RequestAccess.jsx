import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

export default function RequestAccess() {
    const [softwares, setSoftwares] = useState([]);
    const [formData, setFormData] = useState({
        software: "",
        accessType: "Read",
        reason: "",
    });
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchSoftwares = async () => {
            try {
                const res = await axiosInstance.get("/software");
                setSoftwares(res.data.data);
            } catch (err) {
                setError("Failed to load software list.");
            }
        };
        fetchSoftwares();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setMessage("");
            setError("");
            await axiosInstance.post("/requests", formData);
            setMessage("Request submitted successfully.");
            setFormData({ software: "", accessType: "Read", reason: "" });
        } catch (err) {
            setError("Failed to submit request.");
        }
    };

    return (
        <div className="p-6 max-w-xl mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-4">Request Software Access</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <select
                    name="software"
                    value={formData.software}
                    onChange={handleChange}
                    className="p-2 border rounded"
                >
                    <option value="">Select Software</option>
                    {softwares.map((soft) => (
                        <option key={soft.id} value={soft.id}>
                            {soft.name}
                        </option>
                    ))}
                </select>
                <select
                    name="accessType"
                    value={formData.accessType}
                    onChange={handleChange}
                    className="p-2 border rounded"
                >
                    <option value="Read">Read</option>
                    <option value="Write">Write</option>
                    <option value="Admin">Admin</option>
                </select>
                <textarea
                    name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                    placeholder="Reason for access"
                    className="p-2 border rounded"
                />
                {message && <p className="text-green-600">{message}</p>}
                {error && <p className="text-red-600">{error}</p>}
                <button className="bg-blue-600 text-white p-2 rounded">Submit</button>
            </form>
        </div>
    );
}
