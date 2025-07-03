import React from "react";
import Navbar from "../components/Navbar";


const AboutPage = () => {
    return (
        <>
            <Navbar></Navbar>
        <div className="min-h-screen bg-green-50 text-gray-800">
            {/* Header Section */}
            <section className="text-center py-12 bg-green-100 border-b border-green-300">
                <h1 className="text-4xl font-extrabold text-green-700 mb-2">
                    About <span className="text-green-500">Passify</span>
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Your trusted companion for managing and securing your passwords efficiently.
                </p>
            </section>

            {/* Content Section */}
            <section className="max-w-5xl mx-auto px-6 py-12">
                <h2 className="text-2xl font-bold text-green-700 mb-4">Why Passify?</h2>
                <p className="mb-6 text-gray-700">
                    Passify was built to help users securely store, manage, and retrieve their login credentials across all platforms — web, social media, banking, and more. Forgetting passwords or reusing the same ones can lead to poor security practices. Passify solves this by offering a safe and simple way to manage your digital identity.
                </p>

                <h3 className="text-xl font-semibold text-green-600 mb-2">Key Features:</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>🔐 End-to-end encrypted password storage</li>
                    <li>🧠 Easy-to-use, minimalistic interface</li>
                    <li>🧾 Copy to clipboard with one click</li>
                    <li>🛠️ Easily update or delete saved entries</li>
                    <li>📧 Passwords are stored based on your email identity</li>
                </ul>

                <h3 className="text-xl font-semibold text-green-600 mt-10 mb-2">Our Mission</h3>
                <p className="text-gray-700">
                    To make digital security accessible to everyone, without complexity. Passify empowers users to take control of their credentials and stay safe in a connected world.
                </p>
            </section>

            {/* Call to Action */}
            <section className="text-center py-12 bg-green-100 border-t border-green-300">
                <h2 className="text-2xl font-bold text-green-700 mb-4">Ready to secure your passwords?</h2>
                <a href="/home" className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg shadow hover:bg-green-700 transition">
                    Get Started with Passify
                </a>
            </section>
            </div>
        </>
    );
};

export default AboutPage;
