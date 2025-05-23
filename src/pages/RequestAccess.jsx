import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import toast from "react-hot-toast";

export default function RequestAccess() {
    const [softwares, setSoftwares] = useState([]);
    const [formData, setFormData] = useState({
        software: "",
        accessType: "Read",
        reason: "",
    });

    useEffect(() => {
        const fetchSoftwares = async () => {
            try {
                const res = await axiosInstance.get("/software");
                setSoftwares(res.data.data);
            } catch (err) {
                toast.error("Failed to load software list.");
            }
        };
        fetchSoftwares();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.software || !formData.reason) {
            toast.error("All fields are required.");
            return;
        }

        try {
            await axiosInstance.post("/requests", formData);
            toast.success("Request submitted successfully.");
            setFormData({ software: "", accessType: "Read", reason: "" });
        } catch (err) {
            toast.error("Failed to submit request.");
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
                <button className="bg-blue-600 text-white p-2 rounded">Submit</button>
            </form>
        </div>
    );
}
