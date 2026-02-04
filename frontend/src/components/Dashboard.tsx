import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
    const context = useContext(AuthContext);
    const navigate = useNavigate();

    // TypeScript Safety Check
    if (!context) {
        throw new Error("Dashboard must be used within an AuthProvider");
    }

    const { user, logout } = context;

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Dashboard</h1>
            {user ? (
                <div>
                    <h2>Welcome, {user.email}!</h2>
                    <p>Role: {user.is_superuser ? "Administrator" : "Faculty"}</p>
                </div>
            ) : (
                <p>Loading profile...</p>
            )}
            
            <button onClick={handleLogout} style={{ marginTop: '20px' }}>
                Logout
            </button>
        </div>
    );
};

export default Dashboard;
