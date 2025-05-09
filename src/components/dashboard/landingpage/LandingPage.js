import React from "react";
import backgroundimg from './1..png'
import { Button, TextField } from "@mui/material";
import img1 from '../../../assets/portrait-smiling-confident-young-male-professional-with-contract-against-colored-background 1.png'
import img2 from '../../../assets/business-situation-job-interview-concept-job-seeker-present-resume-managers 1.png'
import img3 from '../../../assets/closeup-shot-entrepreneur-working-from-home-his-personal-finances-savings 1.png'
import img4 from '../../../assets/business-people-shaking-hands-together 1.png'
import img5 from '../../../assets/businessman-application-human-digital-business 1.png'
import img6 from '../../../assets/modern-equipped-computer-lab 1.png'
import img7 from '../../../assets/unsplash_Hcfwew744z4.png'
import img8 from '../../../assets/unsplash_hpjSkU2UYSU.png'
import ladyimg from '../../../assets/5a7b0ba3fc73ee370822320de58467b8 1.png'
import footer from './2.png'
import logo from '../../../assets/earnlogo.png';
import Footer from "./Footer";


const features = [
    {
        title: "Easy Employer Registration",
        description:
            "Quickly onboard your company and get started with minimal effort.",
        img: img1,
    },
    {
        title: "Customizable Employee Contracts",
        description:
            "Choose contract types and set payment terms and offerings.",
        img: img2,
    },
    {
        title: "Automated Income Tracking",
        description:
            "Sync income data directly from your payroll system or manually enter it.",
        img: img3,
    },
    {
        title: "Tailored Financial Products",
        description:
            "Offer EWA, loans, and more with customizable terms, eligibility, and fees.",
        img: img4,
    },
    {
        title: "Secure Access",
        description:
            "Control access and ensure data security, with authorized users managing sensitive information.",
        img: img5,
    },
    {
        title: "Daily Income Sync for EWA",
        description:
            "Track employee income in real time for accurate EWA disbursements.",
        img: img6,
    },
    {
        title: "Real-Time Notifications",
        description:
            "Get alerts for contract renewals, employee updates, and more.",
        img: img7,
    },
    {
        title: "Powerful Analytics",
        description:
            "Gain insights into employee participation and financial health.",
        img: img8,
    },
];

export default function LandingPage() {
    return (
        <div className="font-sans text-gray-900">
            {/* Hero Section */}           
            <section
                className="relative h-screen bg-cover bg-center text-white flex flex-col justify-center items-start px-4"
                style={{
                    width: '100%',
                    backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0)), url(${backgroundimg})`,
                }}
            >
                <div className="max-w-full">
                    <h1 className="text-white text-3xl md:text-5xl font-semibold text-center">
                        Welcome to the
                    </h1>
                    <h1 className="text-white text-3xl md:text-5xl font-semibold text-center">
                        Employer Management System (EMS)
                    </h1>
                    <p className="mt-3 md:-mr-80 md:text-3xl text-xl text-center">
                        - Powered by <span className="text-[#0BA7FF] font-bold">Earn+</span>
                    </p>
                    <p className="mt-10 text-xl text-center">
                        Empower your workforce with Earn+, offering Earned Wage Access and more to

                    </p>
                    <p className="mt-1 text-xl text-center">
                        support financial wellness, boost engagement, and drive productivity.
                    </p>
                    <div className="flex justify-center items-center mt-10">
                        <Button
                            sx={{
                                background: 'linear-gradient(to bottom, #0000ff, #00bfff)',
                                color: 'white',
                                px: 6,
                                py: 1.5,
                                borderRadius: '999px',
                                fontWeight: 500,
                                textTransform: 'none',
                                marginTop: '1rem',
                                fontSize: 20,

                                '&:hover': {
                                    background: 'linear-gradient(to bottom, #0000ff, #00bfff)',
                                },
                            }}
                        >
                            Let's Start
                        </Button>
                    </div>
                </div>
            </section>


            {/* Features Section */}
            <section className="py-16 px-4 bg-white">
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
                    Powerful Tools at Your Fingertips
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-full mx-auto px-10">
                    {features.map((item, index) => (
                        <div key={index} className="relative text-white rounded-xl overflow-hidden">
                            <img src={item.img} alt={item.title} className="w-full  object-cover" />
                            <div className="absolute bottom-0 w-full p-4 py-8 bg-black bg-opacity-40 backdrop-blur-md">
                                <h3 className="font-semibold text-[20px] mb-1">{item.title}</h3>
                                <p className="text-[16px] opacity-90 ">{item.description}</p>
                            </div>

                        </div>
                    ))}
                </div>
            </section>

            {/* Get Started CTA */}
            <section className="bg-[#CDEDFF] py-14 text-center">
                {/* <p className="text-yellow-600 text-sm font-bold mb-2 relative inline-block">
                    <span className="relative z-10">Begin</span>
                    <img
                        src="/images/begin-underline.png"
                        alt="underline"
                        className="absolute -bottom-1 left-0 w-full z-0"
                    />
                </p> */}
                <h3 className="text-[40px] font-bold text-[#0000FF]">Get Started Today!</h3>
                <p className="text-[24px] max-w-2xl mx-auto my-8">
                    Log in now to explore Earn+ and take the first step towards improving your workforce’s financial wellbeing.
                </p>
                <div className=" flex justify-center ">
                    <Button
                        sx={{
                            background: 'linear-gradient(to bottom, #0000ff, #00bfff)', // solid blue to sky blue
                            color: 'white',
                            px: 8,
                            py: 1,
                            borderRadius: '999px',
                            fontWeight: 500,
                            textTransform: 'none',
                            fontSize: '20px',
                            '&:hover': {
                                background: 'linear-gradient(to bottom, #0000ff, #00bfff)',
                            },
                        }}
                    >
                        Login
                    </Button>
                </div>
            </section>

            <div className="flex justify-center items-center mt-10">
                <img className="max-w-3xl" src={ladyimg} alt="" />
            </div>

            <div className=" ">
                {/* Header Section */}
                <section className="text-center py-8">
                    <h2 className="text-[40px]  font-semibold">
                        <span className="text-blue-600 font-bold">We’re here to help!</span>{' '}
                        Access support anytime
                    </h2>
                </section>

                {/* Card Section Over Curved Background */}
                <div className="relative mt-36">

                    {/* Floating Cards */}
                    <div className="absolute -top-[150px] w-full px-4 z-10">
                        <div className="w-full px-10 mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 ">
                            {/* Card 1 */}
                            <div className="bg-white p-6 rounded-xl text-center  shadow-xl">
                                <h4 className="text-[40px] font-bold mb-2">Help Center</h4>
                                <p className="text-[24px] ">Find guides and FAQs.</p>
                            </div>

                            {/* Card 2 */}
                            <div className="bg-white p-6 rounded-xl shadow-md text-center">
                                <h4 className="text-[40px] font-bold mb-2">Live Chat</h4>
                                <p className="text-[24px] ">
                                    Connect with support instantly
                                    <br />
                                    (Later we consider putting in a chat window)
                                </p>
                            </div>

                            {/* Card 3 */}
                            <div className="bg-white p-6 rounded-xl shadow-md text-center">
                                <h4 className="text-[40px] font-bold mb-2">Help Center</h4>
                                <p className="text-[24px] ">
                                    Reach us at <br />
                                    <a
                                        href="mailto:support@loan2grow.com"
                                        className="text-blue-600 underline"
                                    >
                                        support@loan2grow.com
                                    </a>
                                    <br />
                                    or +91 7388729386
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Query Form Section */}
                <section
                    className="pt-[160px] pb-16 px-4 relative text-white rounded-tr-[400px]"
                    style={{
                        width: '100%',
                        backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0)), url(${footer})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    {/* <div className="absolute inset-0 bg-black opacity-60"></div> */}
                    <div className="flex items-center justify-center md:ml-52">
                        <div className="relative z-10 text-center mb-6">
                            <h3 className="text-[40px] font-bold text-[#0BA7FF]">Any Query?</h3>
                            <p className="text-[24px] mt-2">Ask us! We are here to help you.</p>
                        </div>
                        <div className="relative z-10 mx-auto space-y-4 w-1/3 ">
                            <div className="">
                                <label >Your Email</label>
                                <TextField
                                    fullWidth
                                    size="small"
                                    type="email"
                                    variant="outlined"
                                    InputProps={{
                                        style: {
                                            backgroundColor: 'white',
                                            marginTop:10
                                           
                                        },
                                    }}
                                />
                            </div>

                            <div>
                                <label>Your Phone no.</label>
                                <TextField
                                    fullWidth
                                    size="small"
                                    type="text"
                                    variant="outlined"
                                    InputProps={{
                                        style: {
                                            backgroundColor: 'white',
                                            marginTop:10
                                           
                                        },
                                    }}
                                />
                            </div>
                            <div>
                                <label> Type your message here</label>
                                <TextField
                                    fullWidth
                                    size="small"
                                    type="text"
                                    variant="outlined"
                                    InputProps={{
                                        style: {
                                            backgroundColor: 'white',
                                            marginTop:10
                                           
                                        },
                                    }}
                                />
                            </div>
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
                                Submit
                            </Button>

                        </div>
                    </div>
                </section>
                <Footer/>
            </div>
        </div>
    );
}
