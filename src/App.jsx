import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from './contexts/AuthContext';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Users from './pages/Users';
import AddUser from './pages/AddUser';
import EditUser from './pages/EditUser';
import Classes from './pages/Classes';
import AddClass from './pages/AddClass';
import EditClass from './pages/EditClass';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Error from './pages/Error';
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'react-toastify/dist/ReactToastify.css';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/profile',
        element: <Profile />
    },
    {
        path: '/users',
        element: <Users />
    },
    {
        path: '/users/add',
        element: <AddUser />
    },
    {
        path: '/users/:id',
        element: <EditUser />
    },
    {
        path: '/classes',
        element: <Classes />
    },
    {
        path: '/classes/add',
        element: <AddClass />
    },
    {
        path: '/classes/:id',
        element: <EditClass />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/logout',
        element: <Logout />
    },
    {
        path: '/*',
        element: <Error />
    }
]);

function App() {
    const { login } = useAuth();

    useEffect(() => {
        if (sessionStorage.getItem('user')) {
            const user = JSON.parse(sessionStorage.getItem('user'));
            login(user);
        } else {
            login(null);
        }
    }, []);

    return (
        <>
            <RouterProvider router={router} />
            <ToastContainer hideProgressBar="true" autoClose="1500" />
        </>
    );
}

export default App;
