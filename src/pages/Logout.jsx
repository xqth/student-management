import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Logout() {
    const { logout } = useAuth();

    useEffect(() => {
        logout();
        sessionStorage.removeItem('user');
    }, []);

    return <Navigate to="/login" />;
}

export default Logout;
