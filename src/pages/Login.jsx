import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function Login() {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axiosInstance.post("/auth/login", formData);
            const { token, username, role } = res.data.data;

            login(token, username, role);
            toast.success("Login successful");

            navigate("/home");
        } catch (err) {
            toast.error(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold mb-6">Login</h1>
            <form onSubmit={handleSubmit} className="w-80 flex flex-col gap-4">
                <input
                    name="username"
                    onChange={handleChange}
                    placeholder="Username"
                    className="p-2 border rounded"
                />
                <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    placeholder="Password"
                    className="p-2 border rounded"
                />
                <button className="bg-blue-500 text-white py-2 rounded">Login</button>
                <p className="text-center text-sm">
                    Don’t have an account?{" "}
                    <Link to="/signup" className="text-blue-600 underline">
                        Sign up
                    </Link>
                </p>
            </form>
        </div>
    );
}
