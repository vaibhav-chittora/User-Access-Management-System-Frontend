import { useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useNavigate, Link } from "react-router-dom";
import { redirectUserByRole } from "../utils/redirectUserByRole";

export default function Signup() {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axiosInstance.post("/auth/signup", formData);
            const { token, role, username } = res.data;

            localStorage.setItem("token", token);
            localStorage.setItem("role", role);
            localStorage.setItem("username", username);

            redirectUserByRole(role, navigate);
        } catch (err) {
            setError("Signup failed: " + err.response?.data?.message || "Server error");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80">
                <input name="username" onChange={handleChange} placeholder="Username" className="p-2 border rounded" />
                <input name="password" type="password" onChange={handleChange} placeholder="Password" className="p-2 border rounded" />
                {error && <p className="text-red-500">{error}</p>}
                <button className="bg-green-500 text-white p-2 rounded">Sign Up</button>
                <p className="text-center">
                    Already have an account? <Link to="/login" className="text-blue-600 underline">Login</Link>
                </p>
            </form>
        </div>
    );
}
