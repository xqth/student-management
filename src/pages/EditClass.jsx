import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Joi from 'joi';
import Navbar from '../components/NavBar';
import { toast } from 'react-toastify';

function EditClass() {
    const { id } = useParams();
    const { user, isLoading } = useAuth();
    const [classData, setClassData] = useState({
        name: '',
        code: '',
        teacher_id: '',
        students: ''
    });

    const handleChange = (event) => {
        setClassData({
            ...classData,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const schema = Joi.object({
            name: Joi.string().required().label('Name'),
            code: Joi.string().required().label('Code'),
            teacher_id: Joi.number().required().label('Teacher ID'),
            students: Joi.string()
                .regex(/^(\d+(,\d+)*)?$/)
                .message('Invalid students list format')
        });
        const result = schema.validate(classData);
        if (result.error) {
            toast.error(result.error.message + '!');
        } else {
            fetch(`http://localhost:3000/classes/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...classData,
                    students: classData.students.split(',').map((student) => parseInt(student))
                })
            })
                .then((response) => response.json())
                .then((data) => {
                    toast.success('Updated class successfully!');
                    setClassData(data);
                });
        }
    };

    useEffect(() => {
        fetch(`http://localhost:3000/classes/${id}`)
            .then((response) => response.json())
            .then((data) => {
                delete data.id;
                data.students = data.students.join(',');
                setClassData(data);
            });
    }, []);

    if (!isLoading && (!user || user.role !== 'admin')) <Navigate to="/login" />;

    return (
        <>
            <Navbar />
            <div className="container mt-3">
                <h2>Edit Class</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            value={classData.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Code</label>
                        <input
                            type="text"
                            className="form-control"
                            name="code"
                            value={classData.code}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Teacher ID</label>
                        <input
                            type="number"
                            className="form-control"
                            name="teacher_id"
                            value={classData.teacher_id}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Students</label>
                        <textarea className="form-control" name="students" onChange={handleChange} value={classData.students}></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary mb-3">
                        Save Changes
                    </button>
                </form>
            </div>
        </>
    );
}

export default EditClass;
