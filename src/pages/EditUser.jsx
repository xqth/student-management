import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Joi from 'joi';
import Navbar from '../components/NavBar';
import { toast } from 'react-toastify';

function EditUser() {
    const { id } = useParams();
    const { user, isLoading } = useAuth();
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'student',
        gender: 'male',
        birthday: '',
        address: '',
        phone: '',
        avatar: ''
    });

    const handleChange = (event) => {
        setUserData({
            ...userData,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const schema = Joi.object({
            name: Joi.string().required().label('Name'),
            email: Joi.string().email({ tlds: false }).required().label('Email'),
            gender: Joi.string().required().allow('male', 'female').label('Gender'),
            role: Joi.string().required().allow('user', 'teacher', 'admin').label('Role'),
            password: Joi.string().required().allow('').min(5).max(20).label('Password'),
            birthday: Joi.string()
                .pattern(/^\d{2}\/\d{2}\/\d{4}$/)
                .required()
                .label('Birthday')
                .messages({
                    'string.pattern.base': '"Birthday" must match the format DD/MM/YYYY'
                }),
            address: Joi.string().required().label('Address'),
            phone: Joi.string()
                .pattern(/^\d{3}-\d{3}-\d{4}$/)
                .required()
                .label('Phone')
                .messages({
                    'string.pattern.base': '"Phone" must match the format ###-###-####'
                }),
            avatar: Joi.string().uri().required().label('Avatar URL')
        });
        const result = schema.validate({
            name: userData.name,
            email: userData.email,
            gender: userData.gender,
            role: userData.role,
            password: userData.password,
            birthday: userData.birthday,
            address: userData.address,
            phone: userData.phone,
            avatar: userData.avatar
        });
        if (result.error) {
            toast.error(result.error.message + '!');
        } else {
            const newData = { ...userData };
            if (newData.password === '') {
                delete newData.password;
            }
            fetch(`http://localhost:3000/users/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newData)
            })
                .then((response) => response.json())
                .then((data) => {
                    toast.success('User updated successfully!');
                    setUserData(data);
                });
        }
    };

    if (!isLoading && (!user || user.role !== 'admin')) <Navigate to="/login" />;

    useEffect(() => {
        fetch(`http://localhost:3000/users/${id}`)
            .then((response) => response.json())
            .then((data) => {
                data.password = '';
                setUserData(data);
            });
    }, []);

    return (
        <>
            <Navbar />
            <div className="container mt-3">
                <h2>Edit User</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            value={userData.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={userData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Gender</label>
                        <select className="form-control" name="gender" value={userData.gender} onChange={handleChange}>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Role</label>
                        <select className="form-control" name="role" value={userData.role} onChange={handleChange}>
                            <option value="student">Student</option>
                            <option value="teacher">Teacher</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            value={userData.password}
                            onChange={handleChange}
                            placeholder="Enter new password"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Birthday</label>
                        <input
                            type="text"
                            className="form-control"
                            name="birthday"
                            value={userData.birthday}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="address" className="form-label">
                            Address
                        </label>
                        <textarea
                            className="form-control"
                            id="address"
                            name="address"
                            rows="3"
                            value={userData.address}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Phone</label>
                        <input
                            type="text"
                            className="form-control"
                            name="phone"
                            value={userData.phone}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Avatar URL</label>
                        <input
                            type="text"
                            className="form-control"
                            name="avatar"
                            value={userData.avatar}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary mb-3">
                        Save Changes
                    </button>
                </form>
            </div>
        </>
    );
}

export default EditUser;
