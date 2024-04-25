import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';  // 确保这里的路径正确

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
    if (!isAuthenticated) {
        // 用户未认证，重定向到登录页面
        return <Navigate to="/login" replace={true} />;
    }

    return children;
};

export default ProtectedRoute;
