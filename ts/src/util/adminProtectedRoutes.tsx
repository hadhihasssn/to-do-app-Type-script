import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface AdminData {
    isLogged: boolean;
}

const ProtectedRoute: React.FC   = ({ children }) => {
    const adminData: AdminData | null = JSON.parse(localStorage.getItem("admin") || "null");
    const isLogged: boolean = adminData?.isLogged || false;
    const location = useLocation();

    if (!isLogged) {
        return <Navigate to="/admin/login/" state={{ from: location }} replace />;
    }

    return <>{children}</>; // Render children using curly braces
};

export default ProtectedRoute;
