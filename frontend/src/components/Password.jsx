import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Context } from "../App";

const Password = () => {
    const { key ,setKey } = useContext(Context);
    const [secretKey, setSecretKey] = useState("");
    const [passwords, setPasswords] = useState([]);
    const [unlocked, setUnlocked] = useState(false);

    setKey(localStorage.getItem("email"));

    const handleUnlock = async () => {
        try {
            const res = await axios.post("https://password-manager-ovh2.onrender.com/getpass", {
                email: key,
                secretKey
            }, { withCredentials: true });

            setPasswords(res.data);
            setUnlocked(true);
        } catch (err) {
            console.error(err);
            alert("Invalid secret key or server error.");
        }
    };

    const copyText = (text) => {
        navigator.clipboard.writeText(text);
        alert("Copied to clipboard!");
    };

    const deletePassword = async (id) => {
        if (!window.confirm("Are you sure you want to delete?")) return;
        try {
            await axios.delete(`https://password-manager-ovh2.onrender.com/delete/${id}`, { withCredentials: true });
            setPasswords(passwords.filter(p => p._id !== id));
            alert("Deleted successfully.");
        } catch (err) {
            alert("Failed to delete.");
        }
    };

    const editPassword = async (id) => {
        const newPassword = prompt("Enter new password:");
        if (!newPassword) return;

        try {
            await axios.put(`https://password-manager-ovh2.onrender.com/update/${id}`, {
                password: newPassword
            }, { withCredentials: true });
            alert("Updated!");
        } catch (err) {
            alert("Update failed.");
        }
    };

        return (
        <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-green-100 to-white p-8">
            <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center shadow-md">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5 9 6.343 9 8s1.343 3 3 3z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.341A8.001 8.001 0 004.572 15.34M15 20h.01M9 20h.01" />
                    </svg>
                </div>
                <div className="text-3xl font-bold">
                    <span className="text-green-500">Pass</span><span className="text-blue-500">ify</span>
                </div>
            </div>

            {!unlocked ? (
                <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md border border-green-500">
                    <h2 className="text-xl font-semibold mb-4 text-center text-green-600">Unlock Your Vault</h2>
                    <input
                        value={secretKey}
                        onChange={(e) => setSecretKey(e.target.value)}
                        placeholder="Enter Secret Key"
                        className="w-full p-3 border border-green-500 rounded-lg shadow-sm focus:ring-2 focus:ring-green-400 mb-4"
                    />
                    <button
                        onClick={handleUnlock}
                        className="w-full p-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-300"
                    >
                        Unlock Vault
                    </button>
                </div>
            ) : (
                <div className="w-full max-w-4xl mt-6">
                    <h2 className="text-lg font-bold text-green-700 mb-4 text-center">Your Saved Passwords</h2>
                    {passwords.length === 0 ? (
                        <p className="text-center text-gray-600">No saved passwords.</p>
                    ) : (
                        <div className="overflow-x-auto rounded-lg shadow border border-green-500">
                            <table className="table-auto w-full text-left bg-white">
                                <thead className="bg-green-800 text-white">
                                                <tr className='text-center'>
                                        <th className="p-3 ">Site</th>
                                        <th className="p-3">Username</th>
                                        <th className="p-3">Password</th>
                                        <th className="p-3">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-green-50">
                                    {passwords.map((p, i) => (
                                        <tr key={i} className="border-t border-green-200 hover:bg-green-100 transition">
                                            <td className="p-3 text-center">
                                                {p.site}
                                            </td>

                                            <td className="p-3 text-center">
                                                {p.username}
                                            </td>

                                            <td className="p-3 text-center">
                                                <div className="flex items-center justify-center gap-2">
                                                    <span>{p.password}</span>
                                                    <button onClick={() => copyText(p.password)} className="text-green-600 hover:text-green-800">📋</button>
                                                </div>
                                            </td>

                                            <td className="p-3 text-center">
                                                <div className="flex items-center justify-center gap-3">
                                                    <button onClick={() => editPassword(p._id)} className="text-yellow-500 hover:text-yellow-700">✏️</button>
                                                    <button onClick={() => deletePassword(p._id)} className="text-red-500 hover:text-red-700">🗑️</button>
                                                </div>
                                            </td>
                                        </tr>
                                      
                                      
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            )}
        </div>
        );
};

export default Password;
