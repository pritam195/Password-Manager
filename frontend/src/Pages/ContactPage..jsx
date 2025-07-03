import React, { useState } from "react";
import Navbar from "../components/Navbar";
import facebook from '../assets/facebook.png'
import insta from '../assets/insta.jpeg'
import linkedin from '../assets/linkedIn.png'
import axios from 'axios'

const ContactPage = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit =async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                'http://localhost:3000/contact',
                {
                    name: form.name,
                    email: form.email,
                    message : form.message
                },
                { withCredentials : true}
            )
        } catch(err) {
            console.error("Message not send", err.response?.data || err.message);
            alert("Message could not be send, Please try again");
        }

        alert("Thank you for contacting us! We'll get back to you soon.");
        setForm({ name: "", email: "", message: "" });
    };

    return (

        <>
            <Navbar></Navbar>
        <div className="min-h-screen bg-green-50 px-4 py-12 text-gray-800">
            {/* Header */}
            <div className="text-center mb-10">
                <h1 className="text-4xl font-extrabold text-green-700 mb-2">
                    Contact <span className="text-green-500">Passify</span>
                </h1>
                <p className="text-gray-600 max-w-xl mx-auto">
                    Have a question or feedback? We'd love to hear from you.
                </p>
            </div>

            {/* Main Content */}
            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 bg-white p-8 rounded-xl shadow border border-green-200">

                {/* Contact Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block font-semibold">Your Name</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            className="w-full mt-1 p-3 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                    </div>

                    <div>
                        <label className="block font-semibold">Your Email</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            className="w-full mt-1 p-3 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                    </div>

                    <div>
                        <label className="block font-semibold">Message</label>
                        <textarea
                            name="message"
                            value={form.message}
                            onChange={handleChange}
                            required
                            rows={5}
                            className="w-full mt-1 p-3 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
                    >
                        Send Message
                    </button>
                </form>

                {/* Contact Info */}
                <div className="space-y-6">
                    <h2 className="text-xl font-bold text-green-600">Get in Touch</h2>
                    <p className="text-gray-600">
                        For any technical support, suggestions, or business inquiries, feel free to reach out.
                    </p>

                    <div className="text-sm space-y-2">
                        <p><strong>Email:</strong> support@passify.com</p>
                        <p><strong>Phone:</strong> +91 98765 43210</p>
                        <p><strong>Address:</strong> Mumbai, Maharashtra, India</p>
                    </div>

                    <div className="flex mt-2 space-x-3">
                        <a href="#"><img src={facebook} alt="Facebook" className="w-11 h-11" /></a>
                        <a href="#"><img src={ insta} alt="Twitter" className="w-7 mt-2 h-7" /></a>
                        <a href="#"><img src={linkedin} alt="LinkedIn" className="w-7 mt-2 ml-2 h-7" /></a>
                    </div>
                </div>
            </div>
            </div>
            </>
    );
};

export default ContactPage;
