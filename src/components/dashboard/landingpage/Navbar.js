import React, { useState } from 'react';
import logo from '../../../assets/earnlogo.png';
import { Button } from '@mui/material';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <nav className="bg-white w-full">
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-24 items-center justify-between">
                    {/* Left: Logo Section */}
                    <div className="flex-shrink-0">
                        <img width={160} src={logo} alt="Logo" />
                    </div>

                    {/* Center: Navigation Links (Desktop Only) */}
                    <div className="hidden md:flex flex-grow justify-center space-x-4">
                        <a href="#" className="text-black font-medium px-3 py-2 hover:text-blue-800">
                            Home
                        </a>
                        <a href="#" className="text-black font-medium px-3 py-2 hover:text-blue-600">
                            Contact Us
                        </a>
                        <a href="#" className="text-black font-medium px-3 py-2 hover:text-blue-600">
                            FAQs
                        </a>
                    </div>

                    {/* Right: Login Button (Desktop Only) */}
                    <div className="hidden md:flex">
    
                        <Button
                            sx={{
                                background: 'linear-gradient(to bottom, #0000ff, #00bfff)', // solid blue to sky blue
                                color: 'white',
                                px: 8,
                                py: 1.5,
                                borderRadius: '999px',
                                fontWeight: 500,
                                textTransform: 'none',
                                '&:hover': {
                                    background: 'linear-gradient(to bottom, #0000ff, #00bfff)',
                                },
                            }}
                        >
                            Login
                        </Button>

                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none"
                        >
                            <span className="sr-only">Open main menu</span>
                            {/* Hamburger Icon */}
                            <svg
                                className={`${isMobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                            {/* X Icon */}
                            <svg
                                className={`${isMobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden`}>
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    <a href="#" className="text-black font-medium block px-3 py-2 hover:bg-gray-50">
                        Home
                    </a>
                    <a href="#" className="text-black font-medium block px-3 py-2 hover:bg-gray-50 hover:text-blue-600">
                        Contact Us
                    </a>
                    <a href="#" className="text-black font-medium block px-3 py-2 hover:bg-gray-50 hover:text-blue-600">
                        FAQs
                    </a>
                    <div className="px-3 py-3">
                    <Button
                            sx={{
                                background: 'linear-gradient(to bottom, #0000ff, #00bfff)', // solid blue to sky blue
                                color: 'white',
                                px: 8,
                                py: 1.5,
                                borderRadius: '999px',
                                fontWeight: 500,
                                textTransform: 'none',
                                '&:hover': {
                                    background: 'linear-gradient(to bottom, #0000ff, #00bfff)',
                                },
                            }}
                        >
                            Login
                        </Button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
