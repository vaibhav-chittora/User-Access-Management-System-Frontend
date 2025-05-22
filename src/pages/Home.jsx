import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
    const navigate = useNavigate();
    const [role, setRole] = useState("");

    useEffect(() => {
        const r = localStorage.getItem("role");
        if (!r) navigate("/login");
        setRole(r);
    }, [navigate]);

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl font-bold">Welcome!</h1>
            <p className="text-xl mb-2">Your role is <b>{role}</b></p>
        </div>
    );
}
