import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function Signup() {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        role: "Employee", // default
    });
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axiosInstance.post("/auth/signup", formData);
            const { token, username, role } = res.data.data;

            login(token, username, role);
            toast.success("Signup successful");

            navigate("/home");
        } catch (err) {
            toast.error(err.response?.data?.message || "Signup failed");
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold mb-6">Sign Up</h1>
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
                <select
                    name="role"
                    onChange={handleChange}
                    className="p-2 border rounded"
                >
                    <option value="Employee">Employee</option>
                    <option value="Manager">Manager</option>
                    <option value="Admin">Admin</option>
                </select>
                <button className="bg-green-500 text-white py-2 rounded">Sign Up</button>
                <p className="text-center text-sm">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-600 underline">
                        Login
                    </Link>
                </p>
            </form>
        </div>
    );
}
