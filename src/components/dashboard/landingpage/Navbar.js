import React, { useState } from 'react';
import logo from '../../../assets/earnlogo.png';
import { Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Define your buttons and routes
    const navItems = [
        { label: 'Home', path: '/' },
        { label: 'Contact Us', path: '/contact' },
        { label: 'FAQs', path: '/faq' },
    ];


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
                        {navItems.map((item) => (
                            <Button
                                key={item.path}
                                onClick={() => navigate(item.path)}
                                sx={{
                                    color: location.pathname === item.path ? '#0000FF' : 'black',
                                    fontWeight: 500,
                                    px: 2,
                                    py: 1,
                                    textTransform: 'none',
                                    '&:hover': {
                                        color: '#0000FF',
                                    },
                                }}
                            >
                                {item.label}
                            </Button>
                        ))}
                    </div>

                    {/* Right: Login Button (Desktop Only) */}
                    <div className="hidden md:flex">

                        <Button
                         onClick={() => navigate('/login')}
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
                    <a  className="text-black font-medium block px-3 py-2 hover:bg-gray-50">
                        Home
                    </a>
                    <a  className="text-black font-medium block px-3 py-2 hover:bg-gray-50 hover:text-blue-600">
                        Contact Us
                    </a>
                    <a  className="text-black font-medium block px-3 py-2 hover:bg-gray-50 hover:text-blue-600">
                        FAQs
                    </a>
                    <div className="px-3 py-3">
                        <Button
                            sx={{
                                background: 'linear-gradient(to bottom, #0000ff, #00bfff)', 
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
