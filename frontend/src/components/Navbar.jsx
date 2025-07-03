import React from 'react';

const Navbar = () => {
  return (
    <nav className='bg-slate-800 text-black py-4 shadow-lg'>
      <div className='container mx-auto flex justify-between items-center px-6'>
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center shadow-md">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5 9 6.343 9 8s1.343 3 3 3z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.341A8.001 8.001 0 004.572 15.34M15 20h.01M9 20h.01" />
            </svg>
          </div>
          <div className="text-3xl font-bold">
            <span className="text-green-500">Pass</span><span className="text-white">ify</span>
          </div>
        </div>

        {/* Navigation Links - Centered */}
        <div className=' flex-grow flex justify-center'>
          <ul className='flex space-x-8 text-lg font-medium'>
            <li>
              <a className='text-white hover:text-yellow-300 transition duration-300' href='/home'>Home</a>
            </li>
            <li>
              <a className='text-white hover:text-yellow-300 transition duration-300' href='/about'>About</a>
            </li>
            <li>
              <a className='text-white hover:text-yellow-300 transition duration-300' href='/contact'>Contact</a>
            </li>
          </ul>
        </div>

        {/* GitHub Section */}
        <button className='px-4 bg-white text-white rounded-md flex gap-1 items-center'>
          <img className='w-10' src="/gith.png" alt="GitHub logo" />
          <span className='text-green-400 font-bold'>GitHub</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

