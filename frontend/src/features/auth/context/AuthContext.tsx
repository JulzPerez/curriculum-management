"use client";

import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
// Adjust this import path if needed to match your folder structure exactly
import api from '../../../lib/axios'; 

interface User {
    id: number;
    email: string;
    is_active: boolean;
    is_superuser: boolean;
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();

    useEffect(() => {
        const checkUser = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await api.get('/users/me');
                    setUser(response.data);
                } catch (error) {
                    console.error("Session expired or invalid:", error);
                    localStorage.removeItem('token');
                    setUser(null);
                }
            }
            setLoading(false);
        };
        checkUser();
    }, []);


const login = async (email: string, password: string) => {
        // 1. Prepare Data
        const params = new URLSearchParams();
        params.append('username', email);
        params.append('password', password);

        // 2. Fetch Token (Bypassing Axios to avoid 422)
	const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
	const response = await fetch(`${apiUrl}/v1/login/access-token`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: params
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || "Login failed");
        }

        const data = await response.json();
        const token = data.access_token; // <--- Grab the token specifically

        // 3. Save it
        localStorage.setItem('token', token);

        // 4. FORCE the Header (The Fix for 403)
        // We don't wait for the interceptor. We manually attach the token.
        const userResponse = await api.get('/users/me', {
            headers: {
                Authorization: `Bearer ${token}` 
            }
        });

        // 5. Success
        setUser(userResponse.data);
        router.push('/');
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        router.push('/login');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
