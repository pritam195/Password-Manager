import React, { useState, useContext } from 'react';
import loginpic from '../assets/loginpic.png';
import logo from '../assets/logo.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Context } from '../App'


const Login = () => {
    const { key ,setKey } = useContext(Context);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'https://password-manager-ovh2.onrender.com/login',
                { email, password },
                { withCredentials: true }
            );

            if (response.status === 200) {
                setKey(email);
                localStorage.setItem("email", email);
                alert("Login Successful");
                navigate('/home');
            }
            
        } catch (err) {
            if (err.response) {
                alert(err.response.data.message);
            } else {
                alert("An error occurred. Please try again");
            }
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <div className="w-1/2 bg-gray-50 flex items-center justify-center p-10">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Password Manager?</h2>
                    <p className="text-gray-600 mb-12">
                        Manage all your logins with ease, security, and peace of mind.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Feature 1 */}
                        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
                            <div className="text-3xl mb-3">🔐</div>
                            <h3 className="text-lg font-semibold text-gray-900">One Vault, Total Access</h3>
                            <p className="text-gray-600 text-sm mt-1">Securely store all your credentials in one encrypted place.</p>
                        </div>

                        {/* Feature 3 */}
                        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
                            <div className="text-3xl mb-3">🛡️</div>
                            <h3 className="text-lg font-semibold text-gray-900">End-to-End Encryption</h3>
                            <p className="text-gray-600 text-sm mt-1">Your data stays private — even we can’t see it.</p>
                        </div>

                        {/* Feature 4 */}
                        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
                            <div className="text-3xl mb-3">🚨</div>
                            <h3 className="text-lg font-semibold text-gray-900">Password Health Monitoring</h3>
                            <p className="text-gray-600 text-sm mt-1">Track weak, reused, or breached passwords easily.</p>
                        </div>

                        {/* Feature 5 */}
                        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
                            <div className="text-3xl mb-3">🌐</div>
                            <h3 className="text-lg font-semibold text-gray-900">Cross-Device Sync</h3>
                            <p className="text-gray-600 text-sm mt-1">Access your vault securely from any device, anytime.</p>
                        </div>

                    </div>
                </div>
            </div>

            <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-6 py-12">
                <div className="flex flex-col items-center mt-8 mb-6">
                    {/* Logo */}
                    <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center shadow-md">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5 9 6.343 9 8s1.343 3 3 3z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.341A8.001 8.001 0 004.572 15.34M15 20h.01M9 20h.01" />
                            </svg>
                        </div>
                        <div className="text-3xl font-bold">
                            <span className="text-green-500">Pass</span><span className="text-gray-800">ify</span>
                        </div>
                    </div>

                    {/* Tagline */}
                    <p className="mt-2 text-sm text-gray-600">
                        Simplify your logins. Fortify your security.
                    </p>
                </div>


                <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg">
                    <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Login to Your Account</h2>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
                        >
                            Login
                        </button>
                    </form>
                    <p className="font-semibold text-gray-800 mt-2 mb-4">
                        Don't have an account? <a href="/signup" className="text-blue-500 hover:underline">Sign up</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
