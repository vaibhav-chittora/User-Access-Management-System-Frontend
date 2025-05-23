import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        isAuthenticated: false,
        token: null,
        username: null,
        role: null,
    });

    useEffect(() => {
        const token = localStorage.getItem("token");
        const username = localStorage.getItem("username");
        const role = localStorage.getItem("role");

        if (token && username && role) {
            setAuth({
                isAuthenticated: true,
                token,
                username,
                role,
            });
        }
    }, []);

    const login = (token, username, role) => {
        localStorage.setItem("token", token);
        localStorage.setItem("username", username);
        localStorage.setItem("role", role);

        setAuth({
            isAuthenticated: true,
            token,
            username,
            role,
        });
    };

    const logout = () => {
        localStorage.clear();
        setAuth({
            isAuthenticated: false,
            token: null,
            username: null,
            role: null,
        });
    };

    return (
        <AuthContext.Provider value={{ ...auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
