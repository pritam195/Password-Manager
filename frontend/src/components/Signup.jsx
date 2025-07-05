import React, { useState, useContext } from 'react';
import loginpic from '../assets/loginpic.png';
import logo from '../assets/logo.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Context } from "../App";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Signup = () => {
    const { key,setKey } = useContext(Context)
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        username: '',
        mobno: '',
        email: '',
        password: '',
        confirmPassword: '',
        secretKey: '',
        gender: '',
        dob: '',
        agree: false,
    });

    const [showPassword, setShowPassword] = useState({
        secretKey: false,
        password: false,
        confirmPassword: false,
    });
    
    const toggleVisibility = (field) => {
        setShowPassword((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
    };
    
    

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        if (!formData.agree) {
            alert('You must agree to the terms and conditions');
            return;
        }

        try {
            const response = await axios.post(
                'https://password-manager-ovh2.onrender.com/create',
                {
                    name: formData.name,
                    username: formData.username,
                    mobno: formData.mobno,
                    email: formData.email,
                    secretKey : formData.secretKey,
                    password: formData.password,
                    gender: formData.gender,
                    dob: formData.dob,
                },
                { withCredentials: true }
            );
            setKey(response.data.email);
            const email = response.data.email;
            alert("Signup Successful");
            localStorage.setItem("email", email);
            navigate('/home');
        } catch (err) {
            console.error('Signup failed', err.response?.data || err.message);
            alert('Signup failed. Try again');
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


            {/* Right Section */}
            <div className="w-full md:w-1/2 flex flex-col justify-center px-6 py-8">
                {/* Logo and Intro */}
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


                {/* Form */}
                <form onSubmit={handleSubmit} className="max-w-lg w-full mx-auto bg-white p-8 shadow-lg rounded-lg space-y-4">
                    {/* Full Name */}
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded-md"
                    />

                    {/* Username & Mobile */}
                    <div className="flex gap-4">
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            className="w-1/2 px-4 py-2 border rounded-md"
                        />
                        <input
                            type="tel"
                            name="mobno"
                            placeholder="Mobile Number"
                            value={formData.mobno}
                            onChange={handleChange}
                            required
                            className="w-1/2 px-4 py-2 border rounded-md"
                        />
                    </div>

                    {/* Email */}
                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded-md"
                    />

                    <div className="relative">
                        <input
                            type={showPassword.secretKey ? 'text' : 'password'}
                            name="secretKey"
                            placeholder="Secret Key"
                            value={formData.secretKey}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-md"
                        />
                        <button
                            type="button"
                            onClick={() => toggleVisibility('secretKey')}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
                        >
                            {showPassword.secretKey ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>

                    {/* Passwords */}
                    <div className="flex gap-4">
                        {/* Password */}
                        <div className="relative w-1/2">
                            <input
                                type={showPassword.password ? 'text' : 'password'}
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border rounded-md"
                            />
                            <button
                                type="button"
                                onClick={() => toggleVisibility('password')}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
                            >
                                {showPassword.password ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>

                        {/* Confirm Password */}
                        <div className="relative w-1/2">
                            <input
                                type={showPassword.confirmPassword ? 'text' : 'password'}
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border rounded-md"
                            />
                            <button
                                type="button"
                                onClick={() => toggleVisibility('confirmPassword')}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
                            >
                                {showPassword.confirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>

                    {/* Gender & DOB */}
                    <div className="flex gap-4">
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            required
                            className="w-1/2 px-4 py-2 border rounded-md text-gray-600"
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                        <input
                            type="date"
                            name="dob"
                            value={formData.dob}
                            onChange={handleChange}
                            required
                            className="w-1/2 px-4 py-2 border rounded-md"
                        />
                    </div>

                    {/* Agreement */}
                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            name="agree"
                            checked={formData.agree}
                            onChange={handleChange}
                            className="w-4 h-4"
                            required
                        />
                        <label className="text-sm text-gray-700">I agree to the terms and conditions</label>
                    </div>

                    <div className="font-semibold text-gray-800 mt-2 mb-4"> Already have an account? <a href="/" className="text-blue-500 hover:underline">Login</a></div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Signup;

