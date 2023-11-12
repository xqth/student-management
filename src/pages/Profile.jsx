import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Joi from 'joi';
import Navbar from '../components/NavBar';
import { toast } from 'react-toastify';

function Profile() {
    const { user, isLoading, login } = useAuth();
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
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
            fetch(`http://localhost:3000/users/${user.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newData)
            })
                .then((response) => response.json())
                .then((data) => {
                    toast.success('Profile updated successfully!');
                    sessionStorage.setItem('user', JSON.stringify(data));
                    login(data);
                    setUserData(data);
                });
        }
    };

    if (!isLoading && !user) <Navigate to="/login" />;

    useEffect(() => {
        if (!isLoading && user) {
            setUserData({ ...user, password: '' });
        }
    }, [user, isLoading]);

    return (
        <>
            <Navbar />
            <div className="container mt-3">
                <h2>Edit Profile</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            value={userData.name}
                            onChange={handleChange}
                            disabled
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
                            disabled
                        />
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
                        <label className="form-label">Gender</label>
                        <select
                            className="form-control"
                            name="gender"
                            value={userData.gender}
                            onChange={handleChange}
                            disabled
                        >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
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

export default Profile;
