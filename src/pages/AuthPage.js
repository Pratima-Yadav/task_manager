import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { login, register } from '../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ username: '', password: '' });

    const [isRegister, setIsRegister] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const validateField = (field, value) => {
        let error = '';
        if (field === 'username') {
            if (!value.trim()) {
                error = 'Username is required.';
            }

        } else if (field === 'password') {
            if (!value) {
                error = 'Password is required.';
            } else if (value.length < 6) {
                error = 'Password must be at least 6 characters long.';

            }
        }
        return error;
    };

    const clearData = () => {
        setUsername("");
        setPassword("");
    }

    const validateForm = () => {
        const newErrors = {
            username: validateField('username', username),
            password: validateField('password', password),
        };

        setErrors(newErrors);
        return !newErrors.username && !newErrors.password;

    };

    const handleSubmit = () => {
        if (!validateForm()) return;

        const users = JSON.parse(localStorage.getItem('users')) || {};
        if (isRegister) {
            if (users[username]) {
                alert('Username already exists');

            } else {
                users[username] = password;
                localStorage.setItem('users', JSON.stringify(users));
                dispatch(register({ username, password }));
                alert('Registration successful!');
                setIsRegister(false);

            }
        } else {
            if (users[username] && users[username] === password) {
                dispatch(login(username));
                navigate('/tasks');

            } else {
                alert('Invalid username or password');

            }
        }
    };

    const handleInputChange = (setter, field) => (e) => {
        const value = e.target.value;

        setter(value);
        setErrors((prevErrors) => ({
            ...prevErrors,

            [field]: validateField(field, value),
        }));
    };

    useEffect(() => {
        clearData();

    }, [isRegister])

    return (
        <div className="h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-500">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
                    {isRegister ? 'Register' : 'Login'}
                </h1>
                <div className="mb-4">
                    <input
                        className={`w-full p-3 border rounded focus:outline-none focus:ring focus:ring-indigo-400 ${errors.username ? 'border-red-500' : ''}`}
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={handleInputChange(setUsername, 'username')}
                    />
                    {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
                </div>
                <div className="mb-4">
                    <input
                        className={`w-full p-3 border rounded focus:outline-none focus:ring focus:ring-indigo-400 ${errors.password ? 'border-red-500' : ''}`}
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={handleInputChange(setPassword, 'password')}
                    />
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                </div>
                <button
                    onClick={handleSubmit}
                    className="w-full bg-indigo-600 text-white py-3 rounded hover:bg-indigo-700 font-semibold"
                >
                    {isRegister ? 'Register' : 'Login'}
                </button>
                <p className="mt-6 text-center text-gray-600">
                    {isRegister ? (
                        <>
                            Already have an account?{' '}
                            <button
                                onClick={() => setIsRegister(false)}
                                className="text-indigo-600 hover:underline"
                            >
                                Login
                            </button>
                        </>
                    ) : (
                        <>
                            Don't have an account?{' '}
                            <button
                                onClick={() => setIsRegister(true)}
                                className="text-indigo-600 hover:underline"
                            >
                                Register
                            </button>
                        </>
                    )}
                </p>
            </div>
        </div>
    );
};

export default AuthPage;
