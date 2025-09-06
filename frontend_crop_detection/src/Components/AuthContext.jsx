import { createContext, useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("access_token"));

    useEffect(() => {
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUser(decoded);
            } catch (error) {
                setUser(null);
            }
        }
    }, [token]);

    const login = (newToken) => {
        localStorage.setItem("access_token", newToken);
        setToken(newToken);
        setUser(jwtDecode(newToken));
    };

    // const logout = () => {
    //     localStorage.removeItem("access_token");
    //     setToken(null);
    //     setUser(null);
    // };


    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        setUser(null);
      };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
