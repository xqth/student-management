import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/NavBar';
import UserCard from '../components/UserCard';
import { toast } from 'react-toastify';

function Users() {
    const { user, isLoading } = useAuth();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/users')
            .then((response) => response.json())
            .then((data) => setUsers(data));
    }, []);

    const handleDelete = (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            fetch(`http://localhost:3000/users/${userId}`, {
                method: 'DELETE'
            })
                .then((response) => response.json())
                .then((data) => {
                    const newUsers = users.filter((user) => user.id !== userId);
                    setUsers(newUsers);
                    toast.success('User deleted successfully!');
                });
        }
    };

    if (!isLoading && (!user || user.role !== 'admin')) return <Navigate to="/login" />;

    return (
        <>
            <Navbar />
            <div className="container mt-5">
                <Link className="btn btn-secondary mb-3" to="/users/add">Add new user</Link>
                <div className="row">
                    {users.map((user) => (
                        <UserCard key={user.id} user={user} onDelete={handleDelete} />
                    ))}
                </div>
            </div>
        </>
    );
}

export default Users;
