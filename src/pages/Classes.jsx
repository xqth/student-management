import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import Navbar from '../components/NavBar';
import ClassCard from '../components/ClassCard';
import { toast } from 'react-toastify';

function Classes() {
    const { user, isLoading } = useAuth();
    const [classes, setClasses] = useState([]);

    const onDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this class?')) {
            fetch(`http://localhost:3000/classes/${id}`, {
                method: 'DELETE'
            })
                .then((response) => response.json())
                .then((data) => {
                    const newClasses = classes.filter((classItem) => classItem.id !== id);
                    setClasses(newClasses);
                    toast.success('Class deleted successfully!');
                });
        }
    };

    useEffect(() => {
        fetch('http://localhost:3000/classes')
            .then((response) => response.json())
            .then((data) => setClasses(data));
    }, []);

    if (!isLoading && (!user || user.role !== 'admin')) return <Navigate to="/login" />;

    return (
        <>
            <Navbar />
            <div className="container mt-5">
                <Link className="btn btn-secondary mb-3" to="/classes/add">
                    Add new class
                </Link>
                <div className="row">
                    {classes.map((classItem) => (
                        <ClassCard key={classItem.id} classData={classItem} onDelete={onDelete} />
                    ))}
                </div>
            </div>
        </>
    );
}

export default Classes;
