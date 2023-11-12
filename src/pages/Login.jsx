import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Joi from 'joi';
import { toast } from 'react-toastify';

function Login() {
    const [data, setData] = useState({
        email: '',
        password: ''
    });
    const { user, isLoading, login } = useAuth();

    const handleChange = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const schema = Joi.object({
            email: Joi.string().email({ tlds: false }).required().label('Email'),
            password: Joi.string().min(5).required().label('Password')
        });
        const result = schema.validate(data);
        if (result.error) {
            toast.error(result.error.message);
        } else {
            fetch(`http://localhost:3000/users?email=${data.email}&password=${data.password}`)
                .then((response) => response.json())
                .then((data) => {
                    if (data.length > 0) {
                        sessionStorage.setItem('user', JSON.stringify(data[0]));
                        toast.success('Login successful!');
                        login(data[0]);
                    } else {
                        toast.error('Invalid login information!');
                    }
                });
        }
    };

    if (!isLoading && user) return <Navigate to="/" />;

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <form className="border shadow p-3 rounded" style={{ width: '450px' }} onSubmit={handleSubmit}>
                <h1 className="text-center p-3">Login</h1>
                <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={data.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        name="password"
                        value={data.password}
                        onChange={handleChange}
                    />
                </div>
                <div className="d-grid">
                    <button type="submit" className="btn btn-primary">
                        Login
                    </button>
                </div>
                <div className="mt-3">
                    <p className="mb-0  text-center">
                        Can't login?{' '}
                        <a href="#" className="text-primary fw-bold">
                            Reset password here
                        </a>
                    </p>
                </div>
            </form>
        </div>
    );
}

export default Login;
