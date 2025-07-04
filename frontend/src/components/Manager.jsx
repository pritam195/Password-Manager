import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Context } from "../App";

const Manager = () => {
    const { key, setKey } = useContext(Context);
    setKey(localStorage.getItem("email"));
    
    const [form, setForm] = useState({ site: "", username: "", password: "" });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const savePassword = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:3000/password", {
                email: key,
                ...form
            }, { withCredentials: true });
            alert("Password saved successfully!");
            setForm({ site: "", username: "", password: "" });
        } catch (err) {
            console.error(err);
            alert("Error saving password.");
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-green-100 to-white p-10">
            <div className="flex items-center space-x-3 m-10">
                <div className="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center shadow-md">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5 9 6.343 9 8s1.343 3 3 3z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.341A8.001 8.001 0 004.572 15.34M15 20h.01M9 20h.01" />
                    </svg>
                </div>
                <div className="text-3xl font-bold">
                    <span className="text-green-500">Pass</span><span className="text-black-500">ify</span>
                </div>
            </div>

            <form onSubmit={savePassword} className="bg-white p-6 rounded-xl shadow-lg w-full max-w-2xl border border-green-500">
                <input
                    name="site"
                    value={form.site}
                    onChange={handleChange}
                    placeholder="Website"
                    required
                    className="w-full p-3 mb-4 border border-green-500 rounded-lg shadow-sm focus:ring-2 focus:ring-green-400"
                />
                <input
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    placeholder="Username"
                    required
                    className="w-full p-3 mb-4 border border-green-500 rounded-lg shadow-sm focus:ring-2 focus:ring-green-400"
                />
                <input
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                    className="w-full p-3 mb-6 border border-green-500 rounded-lg shadow-sm focus:ring-2 focus:ring-green-400"
                />
                <button
                    type="submit"
                    className="w-full p-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-300"
                >
                    Save Password
                </button>
            </form>
        </div>
    );
    
};

export default Manager;

