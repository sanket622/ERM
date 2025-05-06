import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import img from './4.png'
import { Button } from "@mui/material";

const ContactForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = () => {
        console.log({ name, email, message });
        // Handle form submission logic here
    };

    return (
        <>
            <Navbar />
            {/* Header Section */}
            <section
                className="relative h-[535px] pb-16 px-4 text-white rounded-bl-[300px]"
                style={{
                    width: '100%',
                    backgroundImage: `url(${img})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    marginBottom: 20,
                }}
            >
                <div className="relative flex flex-col justify-center items-center text-center h-full">
                    <h3 className="text-[40px] font-bold">Contact Us</h3>
                    <p className="text-[24px] mt-6">
                        Get in touch with our team for assistance or inquiries.
                    </p>
                </div>
            </section>
            <div className="flex justify-center max-h-screen items-center md:mt-20 p-4 md:py-20">
                <div className="relative w-full max-w-5xl">
                    {/* Left Blue Card */}
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-[#CDEDFF] p-20 py-32 rounded shadow-md w-full max-w-sm  z-10">
                        <h2 className="text-[40px] font-semibold mb-12">Contact Us</h2>

                        <div className="flex items-center mb-6">
                            <div className="mr-3 ">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <span className="font-semibold text-[20px]" >reachus@l2gfincap.in</span>
                        </div>

                        <div className="flex items-center">
                            <div className="mr-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                            </div>
                            <span className="font-semibold text-[20px]">+917388729386</span>
                        </div>
                    </div>

                    {/* Right White Card */}
                    <div className="ml-auto bg-white p-8 rounded shadow-lg w-full max-w-3xl">
                        <div className="ml-0 md:ml-40">
                            <h2 className="text-[40px] font-semibold mb-4">Get in Touch</h2>
                            <p className="mb-8 text-[20px]">Feel free to drop us a line below.</p>

                            <div className="space-y-6">
                                <div>
                                    <label>Your Name</label>
                                    <input
                                        type="text"

                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full p-3 mt-4 bg-[#E9F2F8] rounded"
                                    />
                                </div>

                                <div>
                                    <label>Your Email</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full p-3  mt-4 bg-[#E9F2F8] rounded"
                                    />
                                </div>

                                <div>
                                    <label>Type your message here</label>
                                    <textarea
                                        rows="5"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        className="w-full p-3  mt-4 bg-[#E9F2F8] rounded"
                                    />
                                </div>

                                <div>
                                    <Button
                                        sx={{
                                            background: 'linear-gradient(to bottom, #0000FF, #55E4F6)',
                                            color: 'white',
                                            px: 8,
                                            py: 1.5,
                                            borderRadius: '999px',
                                            fontWeight: 500,
                                            textTransform: 'none',
                                            '&:hover': {
                                                background: 'linear-gradient(to bottom, #0000FF, #55E4F6)',
                                            },
                                        }}
                                    >
                                        Send
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <Footer />
        </>
    );
};

export default ContactForm;