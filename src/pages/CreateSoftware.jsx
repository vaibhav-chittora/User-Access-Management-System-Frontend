import { useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

export default function CreateSoftware() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [accessLevels, setAccessLevels] = useState([]);
    const navigate = useNavigate();
    const { role } = useAuth()

    const levelOptions = ["Read", "Write", "Admin"];

    const handleCheckboxChange = (level) => {
        setAccessLevels((prev) =>
            prev.includes(level)
                ? prev.filter((l) => l !== level)
                : [...prev, level]
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !description || accessLevels.length === 0) {
            toast.error("All fields are required.");
            return;
        }
        try {
            await axiosInstance.post("/software/", {
                name,
                description,
                accessLevels,
            },);
            console.log("Users role in creating software",);

            toast.success("Software created successfully!");
            navigate("/home");
        } catch (err) {
            const errorMessage = err.response?.data?.message || "Failed to create software.";
            toast.error(errorMessage);
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded">
            <h2 className="text-2xl font-bold mb-4">Create New Software</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-medium">Software Name</label>
                    <input
                        className="border rounded w-full p-2"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Notion"
                    />
                </div>

                <div>
                    <label className="block font-medium">Description</label>
                    <textarea
                        className="border rounded w-full p-2"
                        rows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Describe what this software is used for"
                    />
                </div>

                <div>
                    <label className="block font-medium">Access Levels</label>
                    <div className="flex gap-4 mt-2">
                        {levelOptions.map((level) => (
                            <label key={level} className="flex items-center gap-1">
                                <input
                                    type="checkbox"
                                    checked={accessLevels.includes(level)}
                                    onChange={() => handleCheckboxChange(level)}
                                />
                                {level}
                            </label>
                        ))}
                    </div>
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Create Software
                </button>
            </form>
        </div>
    );
}
