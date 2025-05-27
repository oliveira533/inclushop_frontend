import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isLogin, setIsLogin] = useState(true); // true for login, false for signup

    const toggleAuthMode = () => {
        setIsLogin(prev => !prev);
    };

    return (
        <AuthContext.Provider value={{ isLogin, toggleAuthMode }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
} 