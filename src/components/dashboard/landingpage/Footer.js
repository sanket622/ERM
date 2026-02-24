import React from 'react'
import logo from '../../../assets/AppIcons.png';

const Footer = () => {
    return (
        <div>
            {/* Footer */}
            <footer className="bg-[#F3F4F6] py-6 px-4 ">
                <div className="flex flex-col md:flex-row justify-between items-center max-w-6xl mx-auto">
                    <div className="flex items-start mb-4 md:mb-0">
                        <img src={logo} alt="Earn Plus" className="w-36" />

                    </div>
                    <div className="flex flex-wrap justify-center gap-4 text-center md:text-left">
                        <span className="cursor-pointer text-black font-semibold">Privacy Policy Terms & Conditions</span>

                    </div>
                    <div className="flex flex-wrap justify-center gap-4 text-center md:text-left">

                        <span className="cursor-pointer text-black font-semibold">Cancellations & Refunds Policy</span>

                    </div>
                    <div className="flex flex-wrap justify-center gap-4 text-center md:text-left">

                        <span className="cursor-pointer text-black font-semibold">Cookies</span>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer
