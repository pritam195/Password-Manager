import React, { useRef, useState, useEffect } from 'react';
// import { v4 as uuidv4 } from 'uuid';
import axios from 'axios'
import { useContext } from "react";
import { useNavigate } from 'react-router-dom'
import { Context } from "../App"; // or wherever your context is

const Manager = () => {

    const { key , setKey } = useContext(Context);
    const [passwordArray, setPasswordArray] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const savedEmail = localStorage.getItem("email");
        if (savedEmail && !key) setKey(savedEmail);
    }, []);

    useEffect(() => {
        if (!key) return;
        const fetchPasswords = async () => {
            try {
                const res = await axios.get('http://localhost:3000/getpass', {
                    params: { email: key }, 
                    withCredentials: true
                });
                setPasswordArray(res.data);
            } catch (err) {
                console.log("Error fetching password:", err.message);
            }
        };

        if (key) fetchPasswords(); 
    }, [key]); 
    

    const passwordRef = useRef(null);
    const ref = useRef();

    const [form, setForm] = useState({ site: "", username: "", password: "" });

    

    const copyText = (text)=>{
        alert("Copied to clipboard!!!");
        navigator.clipboard.writeText(text);
    }

    const [showPassword, setShowPassword] = useState(false);
    const togglePassword = () => {
        setShowPassword(prev => !prev);
    };

    const savePassword = async (e) => {
        e.preventDefault();
        console.log("Saving Password...", form);

        try {
            const response = await axios.post(
                'http://localhost:3000/password',
                {
                    email : key,
                    username: form.username,
                    password: form.password,
                    site : form.site
                },
                {withCredentials : true}
            )
            setKey(response.data.email);
            console.log("Response from backend", response.data);
            alert("Password saved Successfully");
        } catch (err) {
            
            console.error("signup failed" , err.response ?.data || err.message)
            alert("Password could not be saved")
        }

    };

    const deletePassword = async (id) => {
        console.log("Deleting password with id :" , id);
        let c = confirm("Do you really want to delete this id ?")

        if (!c) return;
        try {
            const res = await axios.delete(`http://localhost:3000/delete/${id}`, {
                withCrededntials : true
            });
            alert("Password Deleted Successfully")
            console.log("Delete Success : ", res.data);
        } catch(err) {
            console.log("Error deleting password :", err.message);
            alert("Failed to delete password");
        }
        
    };

    const editPassword = async (id) => {
        console.log("Editing password with id :", id);
        let c = confirm("Do you really want to edit this id ?")

        if (!c) return;

        const newPassword = prompt("Enter the new password : ");

        if(!newPassword) return alert("Password not updated : No value entered.")
        try {
            const res = await axios.put(`http://localhost:3000/update/${id}`, {
                password : newPassword
            } ,{
                withCredentials : true
            })
            alert("Password Edited Successfully");
        } catch (err) {
            console.log("Error editing password :", err.message);
            alert("Failed to edit password");
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-green-100 to-white p-8">
            <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center shadow-md">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5 9 6.343 9 8s1.343 3 3 3z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.341A8.001 8.001 0 004.572 15.34M15 20h.01M9 20h.01" />
                    </svg>
                </div>
                <div className="text-3xl font-bold">
                    <span className="text-green-500">Pass</span><span className="text-blue">ify</span>
                </div>
            </div>
            <p className="text-gray-700 text-lg mt-2">Your own Password Manager</p>
            
            <form action='/password' className="bg-white p-6 rounded-xl shadow-lg mt-6 w-full max-w-2xl border border-green-500">
                <input 
                    value={form.site} 
                    onChange={handleChange}
                    placeholder="Enter website URL" 
                    className="w-full p-3 border border-green-500 rounded-lg shadow-sm focus:ring-2 focus:ring-green-400 mb-4" 
                    type="text" name="site"
                />

                <input 
                    value={form.username} 
                    onChange={handleChange}
                    placeholder="Enter Username" 
                    className="w-full p-3 border border-green-500 rounded-lg shadow-sm focus:ring-2 focus:ring-green-400 mb-4" 
                    type="text" name="username"
                />

                <div className="relative w-full mb-4">
                    <input ref={passwordRef}
                        value={form.password} 
                        onChange={handleChange}
                        placeholder="Enter Password" 
                        className="w-full p-3 border border-green-500 rounded-lg shadow-sm focus:ring-2 focus:ring-green-400 pr-10" 
                        type={showPassword ? "text" : "password"}
                        name="password"
                    />
                    <span
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                        onClick={togglePassword}
                    >
                        <img
                            className="p-1 w-7 h-7"
                            src={showPassword ? "/closed-eyes.png" : "/eye.png"}
                            alt="Toggle Password Visibility"
                        />
                    </span>
                </div>

                <a href="/home">
                    <button 
                        onClick={savePassword} 
                        className="w-full p-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-300">
                        Add Password
                    </button>
                </a>
            </form>

            <div className="mt-8 w-full max-w-2xl">
                <h2 className="text-lg font-bold text-green-700 mb-2">Your Passwords</h2>
                {passwordArray.length === 0 && <div>No passwords to show </div>}
                {passwordArray.length != 0 && <table className="table-auto w-full border border-green-500">
                    <thead className="bg-green-800 text-white">
                        <tr>
                            <th className="p-2">URL</th>
                            <th className="p-2">Username</th>
                            <th className="p-2">Password</th>
                            <th className="p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-green-100">
                        {passwordArray.map((item,index)=>{
                            return <tr key={index}>
                            <td className=' py-2 w-32'>
                            <div className='flex item-center justify-center'>   
                                <span>{item.site}</span>
                                <div className='icon size-7 cursor-pointer' onClick={()=>copyText(item.site)}>
                                <img className='w-5 p-0.5' src="/copy1.png" alt="" />
                                </div>
                            </div>
                            </td>

                            <td className=' py-2 w-32'>
                            <div className='flex item-center justify-center'>   
                                <span>{item.username}</span>
                                <div className='icon size-7 cursor-pointer' onClick={()=>copyText(item.username)}>
                                <img className='w-5 p-0.5' src="/copy1.png" alt="" />
                                </div>
                            </div>
                            </td>
                            
                            <td className=' py-2 w-32'>
                            <div className='icon flex item-center justify-center'>   
                                <span>{item.password}</span>
                                <div className='size-7 cursor-pointer' onClick={()=>copyText(item.password)}>
                                <img className='w-5 p-0.5' src="/copy1.png" alt="" />
                                </div>
                            </div>
                            </td>

                            <td className=' py-2 w-32'>
                            <div className='icon flex item-center justify-center'>   
                                <div className='size-7 cursor-pointer' onClick={()=>{editPassword(item._id)}}>
                                <img className='w-5 p-0.5' src="/edit.png" alt="" />
                                </div>
                                <div className='size-7 cursor-pointer' onClick={()=>{deletePassword(item._id)}}>
                                <img className='w-5 p-0.5' src="/delete.png" alt="" />
                                </div>
                            </div>
                            </td>
                            </tr>
                        })}
                    </tbody>
                </table>}
            </div>
            </div>
    );
};

export default Manager;
