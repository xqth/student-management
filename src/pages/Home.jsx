import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/NavBar';

function Home() {
    const { user, isLoading } = useAuth();
    const [classes, setClasses] = useState([]);

    const getClasses = async () => {
        const classes = [];
        const response = await fetch('http://localhost:3000/classes');
        const data = await response.json();
        for (const item of data) {
            if (item.teacher_id === user.id || item.students.includes(user.id)) {
                classes.push(item);
            }
        }
        return classes;
    };

    useEffect(() => {
        getClasses().then((data) => setClasses(data));
    });

    if (!isLoading && !user) return <Navigate to="/login" />;

    return (
        <>
            <Navbar />
            <div className="container mt-3">
                {user?.role === 'admin' ? (
                    <div className="text-center">
                        <h5>Welcome, Admin!</h5>
                    </div>
                ) : (
                    <>
                        <h2 class="mb-4">Your classes:</h2>

                        <ul class="list-group">
                            {classes.map((item) => (
                                <li class="list-group-item">
                                    {item.code} - {item.name}
                                </li>
                            ))}
                        </ul>
                    </>
                )}
            </div>
        </>
    );
}

export default Home;
