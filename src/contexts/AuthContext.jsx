import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);

    const login = (userData) => {
        setIsLoading(false);
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
    };

    return <AuthContext.Provider value={{ user, isLoading, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};
