import React from 'react'
import facebook from '../assets/facebook.png'
import insta from '../assets/insta.jpeg'
import linkedin from '../assets/linkedIn.png'

const Footer = () => {
  return (
    <footer className="bg-green-100 border-t border-green-300 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-6 text-gray-700">

        {/* Branding Section */}
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

        {/* Quick Links */}
        <div className='ml-35'>
          <h3 className="font-bold mb-2 ">Quick Links</h3>
          <ul className="space-y-1 text-sm">
            <li><a href="/" className="hover:text-green-600">Home</a></li>
            <li><a href="/about" className="hover:text-green-600">About</a></li>
            <li><a href="/manager" className="hover:text-green-600">Password Vault</a></li>
            <li><a href="/contact" className="hover:text-green-600">Contact</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div className='ml-25'>
          <h3 className="font-bold mb-2">Connect</h3>
          <p className="text-sm">Email: support@passify.com</p>
          <p className="text-sm">Phone: +91 98765 43210</p>
          <div className="flex mt-2 space-x-3">
            <a href="#"><img src={facebook} alt="Facebook" className="w-11 h-11" /></a>
            <a href="#"><img src={ insta} alt="Twitter" className="w-7 mt-2 h-7" /></a>
            <a href="#"><img src={linkedin} alt="LinkedIn" className="w-7 mt-2 ml-2 h-7" /></a>
          </div>
        </div>
      </div>

      <div className="text-center text-xs text-gray-500 py-4 border-t border-green-300">
        © {new Date().getFullYear()} Passify. All rights reserved.
      </div>
    </footer>

  )
}

export default Footer
