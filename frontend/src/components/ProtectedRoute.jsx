// src/components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();

    if (!user) {
        // User not logged in, redirect them away
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;